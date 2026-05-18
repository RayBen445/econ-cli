"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elasticityFormula = void 0;
exports.elasticityFormula = {
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
    evaluate(inputs) {
        const [changeInDemand, changeInPrice] = inputs;
        return changeInDemand / changeInPrice;
    },
    explain(inputs, result) {
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
    graph(inputs) {
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
