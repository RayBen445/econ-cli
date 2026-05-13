const figlet = require("figlet");
const gradient = require("gradient-string");
const boxen = require("boxen");

function showBanner() {

  const title = figlet.textSync("ECONLAB", {
    horizontalLayout: "default"
  });

  console.log(
    gradient.pastel.multiline(title)
  );

  console.log(
    boxen(
      "Economics CLI Toolkit",
      {
        padding: 1,
        borderStyle: "round"
      }
    )
  );
}

module.exports = showBanner;