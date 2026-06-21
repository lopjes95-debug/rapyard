import { execSync } from "child_process";
import { createFolders } from "./create-folders.js";
import { createFiles } from "./create-files.js";
import { seedBoilerplates } from "./seed-boilerplates.js";
import { initializeGit } from "./init-git.js";

async function main() {
  console.log("🔧 RapYard Bootstrap Starting…");

  // Auto CD into repo root
  execSync("cd C:\\dev\\rapyard", { stdio: "inherit" });

  await createFolders();
  await createFiles();
  await seedBoilerplates();
  await initializeGit();

  console.log("🚀 RapYard Bootstrap Complete.");
}

main();
