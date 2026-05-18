#!/usr/bin/env node

import { Command } from "commander";

import { registerCommands } from "./commands/registerCommands";
import { AsciiGraphEngine } from "./engines/asciiGraphEngine";
import { createDefaultRegistry } from "./registry/defaultRegistry";
import { renderBanner } from "./renderers/banner";

async function main(): Promise<void> {
  const program = new Command();

  renderBanner();

  program
    .name("econ")
    .description("Economics CLI toolkit with modular formula registry")
    .version("2.0.0");

  const registry = createDefaultRegistry();
  const graphEngine = new AsciiGraphEngine();

  registerCommands(program, registry, graphEngine);

  await program.parseAsync();
}

main().catch((error: Error) => {
  console.error(error.message);
  process.exit(1);
});
