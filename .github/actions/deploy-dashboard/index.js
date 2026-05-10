import fs from "fs";
import path from "path";

async function run() {
  console.log("🚀 Rendering RapYard Deploy Dashboard...");

  const outputPath = path.join(process.cwd(), "rapyard-deploy-dashboard.md");

  const content = `
# RapYard Deployment Dashboard

Generated at: ${new Date().toISOString()}

## Status
- Frontend: Pending
- API: Pending
- Workers: Pending
- Database: Pending

## Notes
This dashboard will be expanded with real deployment metadata.
`;

  fs.writeFileSync(outputPath, content.trim());
  console.log("📄 Dashboard generated:", outputPath);
}

run().catch((err) => {
  console.error("❌ Action failed:", err);
  process.exit(1);
});

