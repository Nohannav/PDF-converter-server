/**
 * Liste les informations et variables restant à configurer avant la mise en ligne.
 * Usage : npm run check:config (lit aussi le fichier .env.local s'il existe).
 */
import fs from "node:fs";
import { missingConfiguration } from "../src/lib/config-check.ts";

for (const file of [".env", ".env.local", ".env.production", ".env.production.local"]) {
  if (fs.existsSync(file)) process.loadEnvFile(file);
}

const missing = missingConfiguration(process.env);
if (missing.length === 0) {
  console.log("✓ Configuration complète.");
} else {
  console.log(`${missing.length} élément(s) à compléter :\n`);
  for (const m of missing) console.log(`  • [${m.area}] ${m.item}`);
  console.log("\nVoir README.md (section « Personnalisation ») et .env.example.");
}
