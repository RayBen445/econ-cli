"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCategoryHelp = renderCategoryHelp;
exports.renderGlobalHelp = renderGlobalHelp;
const cli_table3_1 = __importDefault(require("cli-table3"));
const colors_1 = require("./colors");
function renderCategoryHelp(registry, category) {
    const formulas = registry.listByCategory(category);
    const table = new cli_table3_1.default({
        head: [colors_1.color.title("Command"), colors_1.color.title("Description")]
    });
    formulas.forEach((formula) => {
        table.push([formula.name, formula.description]);
    });
    return table.toString();
}
function renderGlobalHelp(registry) {
    const grouped = registry.list().reduce((acc, formula) => {
        acc[formula.category].push(formula);
        return acc;
    }, {
        microeconomics: [],
        macroeconomics: [],
        finance: []
    });
    const sections = Object.keys(grouped).map((category) => {
        const lines = grouped[category].map((formula) => `  - ${formula.name}: ${formula.description}`).join("\n");
        return `${colors_1.color.title(category)}\n${lines || "  (none)"}`;
    });
    return [
        colors_1.color.title("Available categories"),
        ...sections,
        "",
        colors_1.color.subtle("Tip: use --explain for steps and --graph for chart output")
    ].join("\n");
}
