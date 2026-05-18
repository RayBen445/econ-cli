"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const registry_1 = require("../core/registry");
const gdp_1 = require("../formulas/macroeconomics/gdp");
(0, node_test_1.default)("registry stores and retrieves formulas", () => {
    const registry = new registry_1.FormulaRegistry();
    registry.register(gdp_1.gdpFormula);
    strict_1.default.equal(registry.getById("macroeconomics.gdp")?.name, "gdp");
    strict_1.default.equal(registry.listByCategory("macroeconomics").length, 1);
});
