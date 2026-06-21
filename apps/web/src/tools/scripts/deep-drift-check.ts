#!/usr/bin/env node
import fs from "fs";
import path from "path";
import crypto from "crypto";
import glob from "glob";

const ROOT = process.cwd();
const FIX_MODE = process.argv.includes("--fix");

function hashFile(file: string) {
  const data = fs.readFileSync(file);
  return crypto.createHash("sha256").update(data).digest("hex");
}

function getAllFiles() {
  return glob.sync("**/*.{ts,tsx,js,jsx}", {
    cwd: ROOT,
    ignore: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
  });
}

function deleteFile(file: string) {
  fs.unlinkSync(path.join(ROOT, file));
  console.log(`🗑️  Deleted: ${file}`);
}

function renameFile(oldPath: string, newPath: string) {
  fs.renameSync(path.join(ROOT, oldPath), path.join(ROOT, newPath));
  console.log(`✏️  Renamed: ${oldPath} → ${newPath}`);
}

function detectDuplicateBaseNames(files: string[]) {
  const map = new Map<string, string[]>();

  for (const file of files) {
    const base = path.basename(file).replace(/\.(ts|tsx|js|jsx)$/, "");
    if (!map.has(base)) map.set(base, []);
    map.get(base)!.push(file);
  }

  return [...map.entries()].filter(([_, list]) => list.length > 1);
}

function detectSameHash(files: string[]) {
  const hashMap = new Map<string, string[]>();

  for (const file of files) {
    const full = path.join(ROOT, file);
    const hash = hashFile(full);
    if (!hashMap.has(hash)) hashMap.set(hash, []);
    hashMap.get(hash)!.push(file);
  }

  return [...hashMap.entries()].filter(([_, list]) => list.length > 1);
}

function detectCaseConflicts(files: string[]) {
  const map = new Map<string, string[]>();

  for (const file of files) {
    const lower = file.toLowerCase();
    if (!map.has(lower)) map.set(lower, []);
    map.get(lower)!.push(file);
  }

  return [...map.entries()].filter(([_, list]) => list.length > 1);
}

function detectGhostImports(files: string[]) {
  const missing: { file: string; importPath: string }[] = [];

  for (const file of files) {
    const full = path.join(ROOT, file);
    const content = fs.readFileSync(full, "utf8");

    const importRegex = /from\s+["'](.+?)["']/g;
    let match;

    while ((match = importRegex.exec(content))) {
      const importPath = match[1];

      if (importPath.startsWith(".")) {
        const resolved = path.resolve(path.dirname(full), importPath);
        const candidates = [
          resolved + ".ts",
          resolved + ".tsx",
          resolved + ".js",
          resolved + ".jsx",
          path.join(resolved, "index.ts"),
          path.join(resolved, "index.tsx"),
        ];

        if (!candidates.some((c) => fs.existsSync(c))) {
          missing.push({ file, importPath });
        }
      }
    }
  }

  return missing;
}

function autoFixDuplicates(duplicates: [string, string[]][]) {
  for (const [base, list] of duplicates) {
    const ts = list.find((f) => f.endsWith(".ts"));
    const tsx = list.find((f) => f.endsWith(".tsx"));

    if (ts && tsx) {
      // Prefer .ts
      deleteFile(tsx);
    }
  }
}

function autoFixCaseConflicts(conflicts: [string, string[]][]) {
  for (const [_, list] of conflicts) {
    const canonical = list[0];
    for (const file of list.slice(1)) {
      if (file !== canonical) {
        renameFile(file, canonical);
      }
    }
  }
}

function autoFixSameHash(dupes: [string, string[]][]) {
  for (const [_, list] of dupes) {
    // Keep the first, delete the rest
    for (const file of list.slice(1)) {
      deleteFile(file);
    }
  }
}

function autoFixGhostImports(ghosts: { file: string; importPath: string }[]) {
  for (const g of ghosts) {
    console.log(`⚠️  Ghost import in ${g.file}: ${g.importPath}`);
    // No safe auto-fix for missing modules
  }
}

function main() {
  const files = getAllFiles();

  const duplicates = detectDuplicateBaseNames(files);
  const sameHash = detectSameHash(files);
  const caseConflicts = detectCaseConflicts(files);
  const ghostImports = detectGhostImports(files);

  let drift = false;

  if (duplicates.length) {
    drift = true;
    console.log("\n⚠️ Duplicate module names:");
    duplicates.forEach(([base, list]) => {
      console.log(`  ${base}:`);
      list.forEach((f) => console.log(`    - ${f}`));
    });
    if (FIX_MODE) autoFixDuplicates(duplicates);
  }

  if (sameHash.length) {
    drift = true;
    console.log("\n⚠️ Same-hash duplicates:");
    sameHash.forEach(([hash, list]) => {
      console.log(`  hash ${hash.slice(0, 8)}:`);
      list.forEach((f) => console.log(`    - ${f}`));
    });
    if (FIX_MODE) autoFixSameHash(sameHash);
  }

  if (caseConflicts.length) {
    drift = true;
    console.log("\n⚠️ Case conflicts:");
    caseConflicts.forEach(([lower, list]) => {
      console.log(`  ${lower}:`);
      list.forEach((f) => console.log(`    - ${f}`));
    });
    if (FIX_MODE) autoFixCaseConflicts(caseConflicts);
  }

  if (ghostImports.length) {
    drift = true;
    console.log("\n⚠️ Ghost imports:");
    ghostImports.forEach((g) => console.log(`  - ${g.file} → ${g.importPath}`));
    if (FIX_MODE) autoFixGhostImports(ghostImports);
  }

  if (!drift) {
    console.log("✅ Deep scan clean.");
    process.exit(0);
  }

  if (FIX_MODE) {
    console.log("\n✨ Auto-fix complete.");
    process.exit(0);
  }

  console.log("\n❌ Drift detected.");
  process.exit(1);
}

main();
