"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const calculationService_1 = require("../application/calculationService");
const elasticity_1 = require("../formulas/microeconomics/elasticity");
const gdp_1 = require("../formulas/macroeconomics/gdp");
const npv_1 = require("../formulas/finance/npv");
(0, node_test_1.default)("elasticity formula supports explanation", () => {
    const result = (0, calculationService_1.runFormula)(elasticity_1.elasticityFormula, [-10, 5]);
    strict_1.default.equal(result.value, -2);
    strict_1.default.equal(result.steps.length > 0, true);
});
(0, node_test_1.default)("gdp formula sums expenditure components", () => {
    const result = (0, calculationService_1.runFormula)(gdp_1.gdpFormula, [100, 20, 30, -10]);
    strict_1.default.equal(result.value, 140);
});
(0, node_test_1.default)("npv formula discounts cash flows", () => {
    const result = (0, calculationService_1.runFormula)(npv_1.npvFormula, [0.1, -100, 60, 60]);
    strict_1.default.equal(Math.round(result.value), 4);
});
