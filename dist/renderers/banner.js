"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderBanner = renderBanner;
const boxen_1 = __importDefault(require("boxen"));
const figlet_1 = __importDefault(require("figlet"));
const gradient_string_1 = __importDefault(require("gradient-string"));
const colors_1 = require("./colors");
function renderBanner() {
    const title = figlet_1.default.textSync("ECONLAB", {
        horizontalLayout: "default"
    });
    console.log(gradient_string_1.default.pastel.multiline(title));
    console.log((0, boxen_1.default)(colors_1.color.title("Economics CLI Toolkit"), {
        padding: 1,
        borderStyle: "round"
    }));
}
