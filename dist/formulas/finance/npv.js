"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npvFormula = void 0;
function calculateNpv(rate, cashFlows) {
    return cashFlows.reduce((acc, cashFlow, period) => {
        return acc + cashFlow / Math.pow(1 + rate, period);
    }, 0);
}
exports.npvFormula = {
    id: "finance.npv",
    category: "finance",
    name: "npv",
    description: "Calculate net present value",
    arguments: [
        { key: "discountRate", label: "Discount Rate", description: "Decimal rate, e.g. 0.08" },
        { key: "initialInvestment", label: "Initial Investment", description: "Usually a negative outflow" },
        {
            key: "futureCashFlows",
            label: "Future Cash Flows",
            description: "One or more future cash flows"
        }
    ],
    evaluate(inputs) {
        const [discountRate, initialInvestment, ...futureCashFlows] = inputs;
        return calculateNpv(discountRate, [initialInvestment, ...futureCashFlows]);
    },
    explain(inputs, result) {
        const [discountRate, initialInvestment, ...futureCashFlows] = inputs;
        const summary = [initialInvestment, ...futureCashFlows]
            .map((value, index) => `CF${index}=${value}`)
            .join(", ");
        return [
            {
                title: "Use the NPV formula",
                detail: "NPV = Σ (CF_t / (1 + r)^t)"
            },
            {
                title: "Substitute the rate and cash flows",
                detail: `r = ${discountRate}; ${summary}`
            },
            {
                title: "Sum discounted cash flows",
                detail: `NPV = ${result}`
            }
        ];
    },
    graph(inputs) {
        const [discountRate, initialInvestment, ...futureCashFlows] = inputs;
        const cashFlows = [initialInvestment, ...futureCashFlows];
        const discounted = cashFlows.map((cashFlow, period) => cashFlow / Math.pow(1 + discountRate, period));
        return {
            series: [
                { title: "Raw Cash Flows", values: cashFlows },
                { title: "Discounted Cash Flows", values: discounted }
            ],
            xLabels: cashFlows.map((_, period) => `t${period}`)
        };
    }
};
