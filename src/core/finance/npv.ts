import { CalculationResult, ExplanationStep } from "../../types";
import { npvFormula } from "../../formulas/definitions";

export function calculateNPV(cashFlows: number[], discountRate: number, initialInvestment: number): CalculationResult {
  let result = -initialInvestment;
  const steps: ExplanationStep[] = [
    {
      step: 1,
      description: "Identify the formula for Net Present Value",
      formulaState: npvFormula.latex
    },
    {
      step: 2,
      description: `Identify values: Initial Investment = ${initialInvestment}, Discount Rate = ${discountRate}, Cash Flows = [${cashFlows.join(", ")}]`,
      formulaState: `NPV = \\sum_{t=1}^{${cashFlows.length}} \\frac{R_t}{(1+${discountRate})^t} - ${initialInvestment}`
    }
  ];

  cashFlows.forEach((cf, i) => {
    const t = i + 1;
    const discountedValue = cf / Math.pow(1 + discountRate, t);
    result += discountedValue;
    
    steps.push({
      step: 2 + t,
      description: `Calculate Present Value for Year ${t}`,
      formulaState: `PV_{${t}} = \\frac{${cf}}{(1+${discountRate})^{${t}}} = ${discountedValue.toFixed(2)}`
    });
  });

  steps.push({
    step: 3 + cashFlows.length,
    description: `Sum the Present Values and subtract Initial Investment`,
    formulaState: `NPV = ${result.toFixed(2)}`,
    value: result
  });

  let interpretation = "";
  if (result > 0) interpretation = "The project has a positive NPV and is generally considered a good investment.";
  else if (result < 0) interpretation = "The project has a negative NPV and is generally not considered a good investment.";
  else interpretation = "The project breaks even.";

  return {
    result,
    steps,
    interpretation
  };
}
