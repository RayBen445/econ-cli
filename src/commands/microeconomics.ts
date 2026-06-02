import { Command } from "commander";
import { FormulaRegistry } from "../formulas";
import { GraphEngine } from "../graphs/engine";
import { Exporter } from "../exports/exporter";
import { calculatePriceElasticity } from "../core/microeconomics/elasticity";
import { renderExplanation } from "../explain/engine";
import chalk from "chalk";

export function registerMicroeconomicsCommands(
  program: Command,
  registry: FormulaRegistry,
  graphEngine: GraphEngine,
  exporter: Exporter
): void {
  const micro = program.command("microeconomics").alias("micro").description("Microeconomics formulas");

  micro
    .command("elasticity <q1> <q2> <p1> <p2>")
    .description("Calculate price elasticity of demand")
    .option("-e, --explain", "Show step-by-step explanation")
    .option("--json <path>", "Export result to JSON")
    .option("--md <path>", "Export result to Markdown")
    .action(async (q1, q2, p1, p2, options) => {
      const parsedQ1 = parseFloat(q1);
      const parsedQ2 = parseFloat(q2);
      const parsedP1 = parseFloat(p1);
      const parsedP2 = parseFloat(p2);

      if (isNaN(parsedQ1) || isNaN(parsedQ2) || isNaN(parsedP1) || isNaN(parsedP2)) {
        console.error(chalk.red("Error: All arguments must be valid numbers."));
        process.exit(1);
      }

      const result = calculatePriceElasticity(parsedQ1, parsedQ2, parsedP1, parsedP2);

      if (options.explain) {
        renderExplanation(result, { verbosity: "beginner" });
      } else {
        console.log(chalk.green(`\nPrice Elasticity of Demand: ${result.result.toFixed(2)}`));
        console.log(chalk.gray(`Interpretation: ${result.interpretation}\n`));
      }

      const formula = registry.get("elasticity")!;

      if (options.json) {
        await exporter.exportToJson(formula, result, options.json);
      }
      if (options.md) {
        await exporter.exportToMarkdown(formula, result, options.md);
      }
    });
}
