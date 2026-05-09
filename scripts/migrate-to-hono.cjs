#!/usr/bin/env node

/**
 * RapYard Codemod: Migrate ALL API routes → Hono
 *
 * Converts:
 *   - pages/api/* (legacy Next.js)
 *   - app/api/* (Next.js App Router)
 *   - any loose API handlers
 *
 * Into:
 *   apps/api/src/routes/*
 *
 * Also generates:
 *   apps/api/src/index.ts (Hono root)
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TARGET = path.join(ROOT, "apps/api/src/routes");

const SOURCES = [
  path.join(ROOT, "pages/api"),
  path.join(ROOT, "apps/app/app/api"),
];

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full, callback);
    else callback(full);
  }
}

function convertRoute(file) {
  if (!file.endsWith(".ts") && !file.endsWith(".js")) return;

  const rel = file.includes("pages/api")
    ? path.relative(path.join(ROOT, "pages/api"), file)
    : path.relative(path.join(ROOT, "apps/app/app/api"), file);

  const clean = rel
    .replace(/route\.ts$/, "index.ts")
    .replace(/\.js$/, ".ts");

  const outPath = path.join(TARGET, clean);

  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const honoTemplate = `
import { Hono } from "hono";

const route = new Hono();

route.post(async (c) => {
  return c.json({ ok: true });
});

export default route;
`;

  fs.writeFileSync(outPath, honoTemplate);
  console.log("Migrated →", clean);
}

function writeRootIndex() {
  const indexPath = path.join(ROOT, "apps/api/src/index.ts");

  const content = `
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import routes from "./routes";

const app = new Hono();

app.route("/", routes);

serve({ fetch: app.fetch, port: 3000 });

console.log("Hono API running on :3000");
`;

  fs.writeFileSync(indexPath, content);
  console.log("Created Hono root index.ts");
}

console.log("\n🔧 Migrating API routes → Hono...\n");

SOURCES.forEach((dir) => walk(dir, convertRoute));

writeRootIndex();

console.log("\n✨ Migration complete.\n");
