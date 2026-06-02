import { Command } from "commander";
import { FormulaRegistry } from "../formulas";
import { GraphEngine } from "../graphs/engine";
import { Exporter } from "../exports/exporter";

import { registerMicroeconomicsCommands } from "./microeconomics";
import { registerMacroeconomicsCommands } from "./macroeconomics";
import { registerFinanceCommands } from "./finance";
import { registerInteractiveCommand } from "./interactive";

export function registerCommands(
  program: Command,
  registry: FormulaRegistry,
  graphEngine: GraphEngine,
  exporter: Exporter
): void {
  registerMicroeconomicsCommands(program, registry, graphEngine, exporter);
  registerMacroeconomicsCommands(program, registry, graphEngine, exporter);
  registerFinanceCommands(program, registry, graphEngine, exporter);
  registerInteractiveCommand(program);
}
