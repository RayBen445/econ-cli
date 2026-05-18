"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderResult = renderResult;
const colors_1 = require("./colors");
const explanationRenderer_1 = require("./explanationRenderer");
function renderResult(result, graphEngine, options) {
    console.log(colors_1.color.success(`${result.formulaName.toUpperCase()} Result: ${result.value}`));
    if (options.explain) {
        (0, explanationRenderer_1.renderExplanation)(result.steps);
    }
    if (options.graph && result.graph) {
        console.log(colors_1.color.title("Graph"));
        console.log(graphEngine.render(result.graph));
    }
}
