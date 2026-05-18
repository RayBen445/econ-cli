import { Command } from "commander";

import { GraphEngine } from "../core/graph";
import { FormulaRegistry } from "../core/registry";
import { runInteractiveMode } from "../interactive/mode";
import { renderGlobalHelp } from "../renderers/helpRenderer";
import { registerCategoryCommand } from "./categoryCommand";

export function registerCommands(program: Command, registry: FormulaRegistry, graphEngine: GraphEngine): void {
  registerCategoryCommand(program, "microeconomics", registry, graphEngine);
  registerCategoryCommand(program, "macroeconomics", registry, graphEngine);
  registerCategoryCommand(program, "finance", registry, graphEngine);

  program
    .command("interactive")
    .alias("i")
    .description("Start guided interactive terminal mode")
    .action(async () => {
      await runInteractiveMode(registry, graphEngine);
    });

  program.addHelpText("after", `\n${renderGlobalHelp(registry)}\n`);
}
