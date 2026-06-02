import chalk from "chalk";
import boxen from "boxen";
import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";

export function checkEnvironment(): void {
  console.log(chalk.bold.cyan("EconLab Environment Diagnostics\n"));

  const checks = [
    { name: "Node.js Version", command: "node -v", required: "v18.0.0" },
    { name: "npm Version", command: "npm -v", required: "8.0.0" }
  ];

  let allPassed = true;

  checks.forEach((check) => {
    try {
      const version = execSync(check.command, { stdio: "pipe" }).toString().trim();
      console.log(`${chalk.green("✔")} ${check.name}: ${version}`);
    } catch (e) {
      console.log(`${chalk.red("✖")} ${check.name}: Not found or error executing.`);
      allPassed = false;
    }
  });

  try {
    const pkg = fs.readJsonSync(path.join(process.cwd(), "package.json"));
    if (pkg.name === "econlab") {
      console.log(`${chalk.green("✔")} Package.json: Found valid econlab configuration.`);
    } else {
      console.log(`${chalk.yellow("⚠")} Package.json: Found, but project name mismatch.`);
    }
  } catch (e) {
    console.log(`${chalk.red("✖")} Package.json: Not found in current directory.`);
    allPassed = false;
  }

  if (allPassed) {
    console.log("\n" + boxen(chalk.green.bold("All diagnostic checks passed! System is ready."), { padding: 1, borderStyle: "round" }));
  } else {
    console.log("\n" + boxen(chalk.red.bold("Some checks failed. Please resolve the issues above."), { padding: 1, borderStyle: "round" }));
  }
}
