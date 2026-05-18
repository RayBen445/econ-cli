#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const registerCommands_1 = require("./commands/registerCommands");
const asciiGraphEngine_1 = require("./engines/asciiGraphEngine");
const defaultRegistry_1 = require("./registry/defaultRegistry");
const banner_1 = require("./renderers/banner");
async function main() {
    const program = new commander_1.Command();
    (0, banner_1.renderBanner)();
    program
        .name("econ")
        .description("Economics CLI toolkit with modular formula registry")
        .version("2.0.0");
    const registry = (0, defaultRegistry_1.createDefaultRegistry)();
    const graphEngine = new asciiGraphEngine_1.AsciiGraphEngine();
    (0, registerCommands_1.registerCommands)(program, registry, graphEngine);
    await program.parseAsync();
}
main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
