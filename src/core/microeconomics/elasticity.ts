import { CalculationResult, ExplanationStep } from "../../types";
import { elasticityFormula } from "../../formulas/definitions";

export function calculatePriceElasticity(q1: number, q2: number, p1: number, p2: number): CalculationResult {
  const percentChangeQ = (q2 - q1) / q1;
  const percentChangeP = (p2 - p1) / p1;
  const result = percentChangeP !== 0 ? percentChangeQ / percentChangeP : 0;
  
  const steps: ExplanationStep[] = [
    {
      step: 1,
      description: "Identify the formula for Price Elasticity of Demand",
      formulaState: elasticityFormula.latex
    },
    {
      step: 2,
      description: `Substitute values: Q1 = ${q1}, Q2 = ${q2}, P1 = ${p1}, P2 = ${p2}`,
      formulaState: `E_d = \\frac{\\frac{${q2} - ${q1}}{${q1}}}{\\frac{${p2} - ${p1}}{${p1}}}`
    },
    {
      step: 3,
      description: `Calculate Percentage Change in Quantity Demanded`,
      formulaState: `\\% \\Delta Q = \\frac{${q2 - q1}}{${q1}} = ${(percentChangeQ * 100).toFixed(2)}\\%`
    },
    {
      step: 4,
      description: `Calculate Percentage Change in Price`,
      formulaState: `\\% \\Delta P = \\frac{${p2 - p1}}{${p1}} = ${(percentChangeP * 100).toFixed(2)}\\%`
    },
    {
      step: 5,
      description: `Divide percentage changes`,
      formulaState: `E_d = \\frac{${(percentChangeQ * 100).toFixed(2)}\\%}{${(percentChangeP * 100).toFixed(2)}\\%} = ${result.toFixed(2)}`,
      value: result
    }
  ];

  let interpretation = "";
  const absResult = Math.abs(result);
  if (absResult > 1) interpretation = "Demand is relatively elastic (sensitive to price changes).";
  else if (absResult < 1) interpretation = "Demand is relatively inelastic (insensitive to price changes).";
  else interpretation = "Demand is unit elastic.";

  return {
    result,
    steps,
    interpretation
  };
}
