import { FormulaDefinition, ExplanationStep, GraphPayload } from "../core/formula";

export interface CalculationResult {
  formulaId: string;
  formulaName: string;
  value: number;
  steps: ExplanationStep[];
  graph?: GraphPayload;
}

export function runFormula(formula: FormulaDefinition, inputs: number[]): CalculationResult {
  const value = formula.evaluate(inputs);

  return {
    formulaId: formula.id,
    formulaName: formula.name,
    value,
    steps: formula.explain(inputs, value),
    graph: formula.graph?.(inputs, value)
  };
}
