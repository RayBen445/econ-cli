import { CalculationResult, ExplanationStep } from "../../types";
import { gdpFormula } from "../../formulas/definitions";

export function calculateGDP(c: number, i: number, g: number, x: number, m: number): CalculationResult {
  const result = c + i + g + (x - m);
  
  const steps: ExplanationStep[] = [
    {
      step: 1,
      description: "Identify the components of GDP (Expenditure Approach)",
      formulaState: gdpFormula.latex
    },
    {
      step: 2,
      description: `Substitute the known values: C = ${c}, I = ${i}, G = ${g}, X = ${x}, M = ${m}`,
      formulaState: `GDP = ${c} + ${i} + ${g} + (${x} - ${m})`
    },
    {
      step: 3,
      description: `Calculate Net Exports (X - M)`,
      formulaState: `GDP = ${c} + ${i} + ${g} + (${x - m})`
    },
    {
      step: 4,
      description: `Sum all components`,
      formulaState: `GDP = ${result}`,
      value: result
    }
  ];

  return {
    result,
    steps,
    interpretation: `The Gross Domestic Product is ${result}. This represents the total monetary value of all final goods and services produced.`
  };
}
