"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const defaultRegistry_1 = require("../registry/defaultRegistry");
const helpRenderer_1 = require("../renderers/helpRenderer");
(0, node_test_1.default)("global help includes all categories", () => {
    const output = (0, helpRenderer_1.renderGlobalHelp)((0, defaultRegistry_1.createDefaultRegistry)());
    strict_1.default.match(output, /microeconomics/);
    strict_1.default.match(output, /macroeconomics/);
    strict_1.default.match(output, /finance/);
});
