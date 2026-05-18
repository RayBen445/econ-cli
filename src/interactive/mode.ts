import { runFormula } from "../application/calculationService";
import { GraphEngine } from "../core/graph";
import { FormulaCategory } from "../core/formula";
import { FormulaRegistry } from "../core/registry";
import { renderResult } from "../renderers/resultRenderer";

function parseNumericInput(label: string, raw: string): number {
  const value = Number(raw);
  if (Number.isNaN(value)) {
    throw new Error(`Invalid number for ${label}`);
  }

  return value;
}

export async function runInteractiveMode(registry: FormulaRegistry, graphEngine: GraphEngine): Promise<void> {
  const inquirerModule = await import("inquirer");
  const inquirer = inquirerModule.default;

  const { category } = await inquirer.prompt<{ category: FormulaCategory }>([
    {
      type: "list",
      name: "category",
      message: "Choose a category",
      choices: ["microeconomics", "macroeconomics", "finance"]
    }
  ]);

  const formulas = registry.listByCategory(category);

  const { formulaId } = await inquirer.prompt<{ formulaId: string }>([
    {
      type: "list",
      name: "formulaId",
      message: "Choose a formula",
      choices: formulas.map((formula) => ({
        name: `${formula.name} - ${formula.description}`,
        value: formula.id
      }))
    }
  ]);

  const formula = registry.getById(formulaId);

  if (!formula) {
    throw new Error("Formula not found");
  }

  const inputAnswers = await inquirer.prompt<Record<string, string>>(
    formula.arguments.map((arg) => ({
      type: "input",
      name: arg.key,
      message: `${arg.label}: ${arg.description}`
    }))
  );

  const inputs = formula.arguments.map((arg) => parseNumericInput(arg.label, inputAnswers[arg.key]));

  const options = await inquirer.prompt<{ explain: boolean; graph: boolean }>([
    {
      type: "confirm",
      name: "explain",
      message: "Show step-by-step explanation?",
      default: true
    },
    {
      type: "confirm",
      name: "graph",
      message: "Show graph output?",
      default: false
    }
  ]);

  const result = runFormula(formula, inputs);
  renderResult(result, graphEngine, options);
}
