"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderExplanation = renderExplanation;
const colors_1 = require("./colors");
function renderExplanation(steps) {
    console.log(colors_1.color.title("Step-by-step explanation"));
    for (const [index, step] of steps.entries()) {
        console.log(`${colors_1.color.accent(`${index + 1}. ${step.title}`)}: ${step.detail}`);
    }
}
