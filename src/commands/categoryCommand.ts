import { Command } from "commander";

import { runFormula } from "../application/calculationService";
import { GraphEngine } from "../core/graph";
import { FormulaCategory } from "../core/formula";
import { FormulaRegistry } from "../core/registry";
import { renderCategoryHelp } from "../renderers/helpRenderer";
import { renderResult } from "../renderers/resultRenderer";

function parseNumbers(values: string[]): number[] {
  return values.map((value) => Number(value));
}

function assertValidNumbers(values: number[]): void {
  if (values.some((value) => Number.isNaN(value))) {
    throw new Error("All inputs must be numeric.");
  }
}

export function registerCategoryCommand(
  program: Command,
  category: FormulaCategory,
  registry: FormulaRegistry,
  graphEngine: GraphEngine
): void {
  const categoryCommand = program.command(category).description(`${category} formulas`);

  categoryCommand.addHelpText("after", `\n${renderCategoryHelp(registry, category)}\n`);

  registry.listByCategory(category).forEach((formula) => {
    const args = formula.arguments.map((arg) => `<${arg.key}>`).join(" ");

    categoryCommand
      .command(`${formula.name} ${args}`)
      .description(formula.description)
      .option("-e, --explain", "Show step-by-step explanation")
      .option("-g, --graph", "Render a quick terminal graph")
      .action((...rawArgs: unknown[]) => {
        const command = rawArgs[rawArgs.length - 1] as Command;
        const argValues = rawArgs.slice(0, rawArgs.length - 1).map((value) => String(value));
        const inputs = parseNumbers(argValues);

        assertValidNumbers(inputs);

        const result = runFormula(formula, inputs);

        renderResult(result, graphEngine, {
          explain: Boolean(command.opts().explain),
          graph: Boolean(command.opts().graph)
        });
      });
  });
}
