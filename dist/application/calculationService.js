"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFormula = runFormula;
function runFormula(formula, inputs) {
    const value = formula.evaluate(inputs);
    return {
        formulaId: formula.id,
        formulaName: formula.name,
        value,
        steps: formula.explain(inputs, value),
        graph: formula.graph?.(inputs, value)
    };
}
