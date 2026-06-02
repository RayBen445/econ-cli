#!/usr/bin/env node

import { Command } from "commander";
import updateNotifier from "update-notifier";
import fs from "fs-extra";
import path from "path";

// Remove old imports for now, we will add them back as we build them out
import { renderBanner } from "../themes";
import { checkEnvironment } from "../commands/doctor";
import { registerCommands } from "../commands/registerCommands";
import { GraphEngine } from "../graphs/engine";
import { defaultRegistry } from "../formulas";
import { Exporter } from "../exports/exporter";

async function main(): Promise<void> {
  const pkg = fs.readJsonSync(path.join(__dirname, "../../package.json"));
  updateNotifier({ pkg }).notify();

  const program = new Command();

  // Only render banner if not running doctor or help
  if (!process.argv.includes("doctor")) {
    renderBanner("ECONLAB");
  }

  program
    .name("econlab")
    .description("EconLab ecosystem-grade developer terminal toolkit. Powered by Kontyra.")
    .version(pkg.version);

  program
    .command("doctor")
    .description("Run system diagnostics and verify environment")
    .action(() => {
      checkEnvironment();
    });

  const graphEngine = new GraphEngine();
  const exporter = new Exporter();
  
  registerCommands(program, defaultRegistry, graphEngine, exporter);

  await program.parseAsync();
}

main().catch((error: Error) => {
  console.error(error.message);
  process.exit(1);
});
