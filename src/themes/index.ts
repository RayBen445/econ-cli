import chalk, { Chalk } from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import { ThemeConfig, Theme } from "../types";

export const themes: Record<Theme, ThemeConfig> = {
  neon: {
    primary: "#00ff00",
    secondary: "#ff00ff",
    text: "#ffffff",
    success: "#00ff00",
    warning: "#ffff00",
    error: "#ff0000",
    background: "#000000",
    borderStyle: "double"
  },
  matrix: {
    primary: "#00ff00",
    secondary: "#008800",
    text: "#00ff00",
    success: "#00ff00",
    warning: "#ffff00",
    error: "#ff0000",
    background: "#000000",
    borderStyle: "single"
  },
  minimal: {
    primary: "#ffffff",
    secondary: "#aaaaaa",
    text: "#ffffff",
    success: "#00ff00",
    warning: "#ffff00",
    error: "#ff0000",
    background: "#000000",
    borderStyle: "classic"
  },
  pastel: {
    primary: "#ffb3ba",
    secondary: "#baffc9",
    text: "#ffffff",
    success: "#baffc9",
    warning: "#ffffba",
    error: "#ffb3ba",
    background: "#222222",
    borderStyle: "round"
  },
  academic: {
    primary: "#000080",
    secondary: "#800000",
    text: "#000000",
    success: "#008000",
    warning: "#808000",
    error: "#800000",
    background: "#ffffff",
    borderStyle: "singleDouble"
  },
  retro: {
    primary: "#ffaa00",
    secondary: "#aa5500",
    text: "#ffaa00",
    success: "#00ff00",
    warning: "#ffff00",
    error: "#ff0000",
    background: "#221100",
    borderStyle: "doubleSingle"
  }
};

let currentTheme: Theme = "neon";

export function setTheme(themeName: Theme): void {
  currentTheme = themeName;
}

export function getThemeConfig(): ThemeConfig {
  return themes[currentTheme];
}

export function renderBanner(text: string, font: figlet.Fonts = "Standard"): void {
  const renderedText = figlet.textSync(text, { font });
  
  if (currentTheme === "neon" || currentTheme === "pastel") {
    console.log(gradient.pastel.multiline(renderedText));
  } else if (currentTheme === "matrix") {
    console.log(chalk.green(renderedText));
  } else if (currentTheme === "retro") {
    console.log(chalk.yellow(renderedText));
  } else {
    console.log(chalk.blue(renderedText));
  }
}
