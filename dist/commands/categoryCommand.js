"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCategoryCommand = registerCategoryCommand;
const calculationService_1 = require("../application/calculationService");
const helpRenderer_1 = require("../renderers/helpRenderer");
const resultRenderer_1 = require("../renderers/resultRenderer");
function parseNumbers(values) {
    return values.map((value) => Number(value));
}
function assertValidNumbers(values) {
    if (values.some((value) => Number.isNaN(value))) {
        throw new Error("All inputs must be numeric.");
    }
}
function registerCategoryCommand(program, category, registry, graphEngine) {
    const categoryCommand = program.command(category).description(`${category} formulas`);
    categoryCommand.addHelpText("after", `\n${(0, helpRenderer_1.renderCategoryHelp)(registry, category)}\n`);
    registry.listByCategory(category).forEach((formula) => {
        const args = formula.arguments.map((arg) => `<${arg.key}>`).join(" ");
        categoryCommand
            .command(`${formula.name} ${args}`)
            .description(formula.description)
            .option("-e, --explain", "Show step-by-step explanation")
            .option("-g, --graph", "Render a quick terminal graph")
            .action((...rawArgs) => {
            const command = rawArgs[rawArgs.length - 1];
            const argValues = rawArgs.slice(0, rawArgs.length - 1).map((value) => String(value));
            const inputs = parseNumbers(argValues);
            assertValidNumbers(inputs);
            const result = (0, calculationService_1.runFormula)(formula, inputs);
            (0, resultRenderer_1.renderResult)(result, graphEngine, {
                explain: Boolean(command.opts().explain),
                graph: Boolean(command.opts().graph)
            });
        });
    });
}
