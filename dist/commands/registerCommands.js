"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = registerCommands;
const mode_1 = require("../interactive/mode");
const helpRenderer_1 = require("../renderers/helpRenderer");
const categoryCommand_1 = require("./categoryCommand");
function registerCommands(program, registry, graphEngine) {
    (0, categoryCommand_1.registerCategoryCommand)(program, "microeconomics", registry, graphEngine);
    (0, categoryCommand_1.registerCategoryCommand)(program, "macroeconomics", registry, graphEngine);
    (0, categoryCommand_1.registerCategoryCommand)(program, "finance", registry, graphEngine);
    program
        .command("interactive")
        .alias("i")
        .description("Start guided interactive terminal mode")
        .action(async () => {
        await (0, mode_1.runInteractiveMode)(registry, graphEngine);
    });
    program.addHelpText("after", `\n${(0, helpRenderer_1.renderGlobalHelp)(registry)}\n`);
}
