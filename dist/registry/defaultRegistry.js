"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultRegistry = createDefaultRegistry;
const registry_1 = require("../core/registry");
const elasticity_1 = require("../formulas/microeconomics/elasticity");
const gdp_1 = require("../formulas/macroeconomics/gdp");
const npv_1 = require("../formulas/finance/npv");
function createDefaultRegistry() {
    const registry = new registry_1.FormulaRegistry();
    registry.register(elasticity_1.elasticityFormula);
    registry.register(gdp_1.gdpFormula);
    registry.register(npv_1.npvFormula);
    return registry;
}
