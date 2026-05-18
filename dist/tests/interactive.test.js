"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const defaultRegistry_1 = require("../registry/defaultRegistry");
(0, node_test_1.default)("default registry contains formulas used by interactive mode", () => {
    const registry = (0, defaultRegistry_1.createDefaultRegistry)();
    strict_1.default.equal(registry.listByCategory("microeconomics").length > 0, true);
    strict_1.default.equal(registry.listByCategory("macroeconomics").length > 0, true);
    strict_1.default.equal(registry.listByCategory("finance").length > 0, true);
});
