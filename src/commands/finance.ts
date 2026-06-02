import { Command } from "commander";
import { FormulaRegistry } from "../formulas";
import { GraphEngine } from "../graphs/engine";
import { Exporter } from "../exports/exporter";
import { calculateNPV } from "../core/finance/npv";
import { renderExplanation } from "../explain/engine";
import chalk from "chalk";

export function registerFinanceCommands(
  program: Command,
  registry: FormulaRegistry,
  graphEngine: GraphEngine,
  exporter: Exporter
): void {
  const finance = program.command("finance").description("Finance formulas");

  finance
    .command("npv <initialInvestment> <discountRate> [cashFlows...]")
    .description("Calculate Net Present Value")
    .option("-e, --explain", "Show step-by-step explanation")
    .option("--json <path>", "Export result to JSON")
    .option("--md <path>", "Export result to Markdown")
    .action(async (initialInvestment, discountRate, cashFlows, options) => {
      const parsedInv = parseFloat(initialInvestment);
      const parsedRate = parseFloat(discountRate);
      const parsedFlows = cashFlows.map((cf: string) => parseFloat(cf));

      if (isNaN(parsedInv) || isNaN(parsedRate) || parsedFlows.some(isNaN)) {
        console.error(chalk.red("Error: All arguments must be valid numbers."));
        process.exit(1);
      }

      const result = calculateNPV(parsedFlows, parsedRate, parsedInv);

      if (options.explain) {
        renderExplanation(result, { verbosity: "beginner" });
      } else {
        console.log(chalk.green(`\nNPV: ${result.result.toFixed(2)}`));
        console.log(chalk.gray(`Interpretation: ${result.interpretation}\n`));
      }

      const formula = registry.get("npv")!;

      if (options.json) {
        await exporter.exportToJson(formula, result, options.json);
      }
      if (options.md) {
        await exporter.exportToMarkdown(formula, result, options.md);
      }
    });
}
