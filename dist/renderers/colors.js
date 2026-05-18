"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.color = {
    title: (value) => chalk_1.default.bold.cyan(value),
    success: (value) => chalk_1.default.green(value),
    accent: (value) => chalk_1.default.magenta(value),
    warning: (value) => chalk_1.default.yellow(value),
    subtle: (value) => chalk_1.default.gray(value)
};
