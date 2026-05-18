import Table from "cli-table3";

import { FormulaCategory, FormulaDefinition } from "../core/formula";
import { FormulaRegistry } from "../core/registry";
import { color } from "./colors";

export function renderCategoryHelp(registry: FormulaRegistry, category: FormulaCategory): string {
  const formulas = registry.listByCategory(category);

  const table = new Table({
    head: [color.title("Command"), color.title("Description")]
  });

  formulas.forEach((formula) => {
    table.push([formula.name, formula.description]);
  });

  return table.toString();
}

export function renderGlobalHelp(registry: FormulaRegistry): string {
  const grouped = registry.list().reduce<Record<FormulaCategory, FormulaDefinition[]>>(
    (acc, formula) => {
      acc[formula.category].push(formula);
      return acc;
    },
    {
      microeconomics: [],
      macroeconomics: [],
      finance: []
    }
  );

  const sections = (Object.keys(grouped) as FormulaCategory[]).map((category) => {
    const lines = grouped[category].map((formula) => `  - ${formula.name}: ${formula.description}`).join("\n");
    return `${color.title(category)}\n${lines || "  (none)"}`;
  });

  return [
    color.title("Available categories"),
    ...sections,
    "",
    color.subtle("Tip: use --explain for steps and --graph for chart output")
  ].join("\n");
}
