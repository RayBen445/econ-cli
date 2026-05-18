"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaRegistry = void 0;
class FormulaRegistry {
    constructor() {
        this.formulas = new Map();
    }
    register(definition) {
        this.formulas.set(definition.id, definition);
    }
    getById(id) {
        return this.formulas.get(id);
    }
    list() {
        return [...this.formulas.values()];
    }
    listByCategory(category) {
        return this.list().filter((formula) => formula.category === category);
    }
}
exports.FormulaRegistry = FormulaRegistry;
