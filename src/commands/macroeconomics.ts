import { Command } from "commander";
import { FormulaRegistry } from "../formulas";
import { GraphEngine } from "../graphs/engine";
import { Exporter } from "../exports/exporter";
import { calculateGDP } from "../core/macroeconomics/gdp";
import { renderExplanation } from "../explain/engine";
import chalk from "chalk";

export function registerMacroeconomicsCommands(
  program: Command,
  registry: FormulaRegistry,
  graphEngine: GraphEngine,
  exporter: Exporter
): void {
  const macro = program.command("macroeconomics").alias("macro").description("Macroeconomics formulas");

  macro
    .command("gdp <c> <i> <g> <x> <m>")
    .description("Calculate GDP using expenditure approach")
    .option("-e, --explain", "Show step-by-step explanation")
    .option("--json <path>", "Export result to JSON")
    .option("--md <path>", "Export result to Markdown")
    .action(async (c, i, g, x, m, options) => {
      const parsedC = parseFloat(c);
      const parsedI = parseFloat(i);
      const parsedG = parseFloat(g);
      const parsedX = parseFloat(x);
      const parsedM = parseFloat(m);

      if (isNaN(parsedC) || isNaN(parsedI) || isNaN(parsedG) || isNaN(parsedX) || isNaN(parsedM)) {
        console.error(chalk.red("Error: All arguments must be valid numbers."));
        process.exit(1);
      }

      const result = calculateGDP(parsedC, parsedI, parsedG, parsedX, parsedM);

      if (options.explain) {
        renderExplanation(result, { verbosity: "beginner" });
      } else {
        console.log(chalk.green(`\nGDP: ${result.result.toFixed(2)}`));
        console.log(chalk.gray(`Interpretation: ${result.interpretation}\n`));
      }

      const formula = registry.get("gdp")!;

      if (options.json) {
        await exporter.exportToJson(formula, result, options.json);
      }
      if (options.md) {
        await exporter.exportToMarkdown(formula, result, options.md);
      }
    });
}
