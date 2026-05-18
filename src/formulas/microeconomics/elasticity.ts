import { FormulaDefinition } from "../../core/formula";

export const elasticityFormula: FormulaDefinition = {
  id: "microeconomics.elasticity",
  category: "microeconomics",
  name: "elasticity",
  description: "Calculate price elasticity of demand",
  arguments: [
    {
      key: "changeInDemand",
      label: "Change in Demand (%)",
      description: "Percentage change in demand"
    },
    {
      key: "changeInPrice",
      label: "Change in Price (%)",
      description: "Percentage change in price"
    }
  ],
  evaluate(inputs: number[]): number {
    const [changeInDemand, changeInPrice] = inputs;
    return changeInDemand / changeInPrice;
  },
  explain(inputs: number[], result: number) {
    const [changeInDemand, changeInPrice] = inputs;
    return [
      {
        title: "Identify the elasticity formula",
        detail: "Elasticity = (% change in demand) / (% change in price)"
      },
      {
        title: "Substitute the given values",
        detail: `Elasticity = ${changeInDemand} / ${changeInPrice}`
      },
      {
        title: "Compute the ratio",
        detail: `Elasticity = ${result}`
      }
    ];
  },
  graph(inputs: number[]) {
    const [changeInDemand, changeInPrice] = inputs;
    return {
      series: [
        {
          title: "Demand vs Price Change",
          values: [changeInDemand, changeInPrice]
        }
      ],
      xLabels: ["Demand %", "Price %"]
    };
  }
};
