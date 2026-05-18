import boxen from "boxen";
import figlet from "figlet";
import gradient from "gradient-string";

import { color } from "./colors";

export function renderBanner(): void {
  const title = figlet.textSync("ECONLAB", {
    horizontalLayout: "default"
  });

  console.log(gradient.pastel.multiline(title));
  console.log(
    boxen(color.title("Economics CLI Toolkit"), {
      padding: 1,
      borderStyle: "round"
    })
  );
}
