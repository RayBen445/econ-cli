import chalk from "chalk";
import boxen from "boxen";
import { CalculationResult } from "../types";

export interface ExplainOptions {
  verbosity: "beginner" | "advanced";
  showLatex?: boolean;
}

export function renderExplanation(result: CalculationResult, options: ExplainOptions = { verbosity: "beginner" }): void {
  console.log("\n" + chalk.bold.cyan("--- Step-by-Step Explanation ---") + "\n");

  result.steps.forEach(step => {
    console.log(chalk.yellow(`Step ${step.step}: `) + chalk.white(step.description));
    if (options.verbosity === "beginner" || options.showLatex) {
      console.log(chalk.gray(`  Formula: ${step.formulaState}`));
    }
    
    if (step.value !== undefined) {
      console.log(chalk.green(`  Value: ${step.value}`));
    }
    console.log("");
  });

  console.log(
    boxen(
      chalk.bold.magenta("Result: ") + chalk.white(result.result.toString()) + "\n\n" +
      chalk.bold.magenta("Interpretation: ") + chalk.white(result.interpretation),
      { padding: 1, borderStyle: "round", borderColor: "cyan" }
    )
  );
}
