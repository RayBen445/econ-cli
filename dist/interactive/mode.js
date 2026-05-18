"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInteractiveMode = runInteractiveMode;
const inquirer_1 = __importDefault(require("inquirer"));
const calculationService_1 = require("../application/calculationService");
const resultRenderer_1 = require("../renderers/resultRenderer");
function parseNumericInput(label, raw) {
    const value = Number(raw);
    if (Number.isNaN(value)) {
        throw new Error(`Invalid number for ${label}`);
    }
    return value;
}
async function runInteractiveMode(registry, graphEngine) {
    const { category } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "category",
            message: "Choose a category",
            choices: ["microeconomics", "macroeconomics", "finance"]
        }
    ]);
    const formulas = registry.listByCategory(category);
    const { formulaId } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "formulaId",
            message: "Choose a formula",
            choices: formulas.map((formula) => ({
                name: `${formula.name} - ${formula.description}`,
                value: formula.id
            }))
        }
    ]);
    const formula = registry.getById(formulaId);
    if (!formula) {
        throw new Error("Formula not found");
    }
    const inputAnswers = await inquirer_1.default.prompt(formula.arguments.map((arg) => ({
        type: "input",
        name: arg.key,
        message: `${arg.label}: ${arg.description}`
    })));
    const inputs = formula.arguments.map((arg) => parseNumericInput(arg.label, inputAnswers[arg.key]));
    const options = await inquirer_1.default.prompt([
        {
            type: "confirm",
            name: "explain",
            message: "Show step-by-step explanation?",
            default: true
        },
        {
            type: "confirm",
            name: "graph",
            message: "Show graph output?",
            default: false
        }
    ]);
    const result = (0, calculationService_1.runFormula)(formula, inputs);
    (0, resultRenderer_1.renderResult)(result, graphEngine, options);
}
