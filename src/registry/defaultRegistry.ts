import { FormulaRegistry } from "../core/registry";
import { elasticityFormula } from "../formulas/microeconomics/elasticity";
import { gdpFormula } from "../formulas/macroeconomics/gdp";
import { npvFormula } from "../formulas/finance/npv";

export function createDefaultRegistry(): FormulaRegistry {
  const registry = new FormulaRegistry();

  registry.register(elasticityFormula);
  registry.register(gdpFormula);
  registry.register(npvFormula);

  return registry;
}
