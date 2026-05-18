"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gdpFormula = void 0;
exports.gdpFormula = {
    id: "macroeconomics.gdp",
    category: "macroeconomics",
    name: "gdp",
    description: "Calculate GDP using expenditure approach",
    arguments: [
        { key: "consumption", label: "Consumption (C)", description: "Household spending" },
        { key: "investment", label: "Investment (I)", description: "Business investment" },
        { key: "government", label: "Government Spending (G)", description: "Government spending" },
        { key: "netExports", label: "Net Exports (NX)", description: "Exports minus imports" }
    ],
    evaluate(inputs) {
        const [c, i, g, nx] = inputs;
        return c + i + g + nx;
    },
    explain(inputs, result) {
        const [c, i, g, nx] = inputs;
        return [
            {
                title: "Use the expenditure formula",
                detail: "GDP = C + I + G + NX"
            },
            {
                title: "Substitute values",
                detail: `GDP = ${c} + ${i} + ${g} + ${nx}`
            },
            {
                title: "Add the components",
                detail: `GDP = ${result}`
            }
        ];
    },
    graph(inputs) {
        const [c, i, g, nx] = inputs;
        return {
            series: [
                {
                    title: "GDP Components",
                    values: [c, i, g, nx]
                }
            ],
            xLabels: ["C", "I", "G", "NX"]
        };
    }
};
