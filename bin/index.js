#!/usr/bin/env node

const { Command } = require("commander");

const program = new Command();
const showBanner =
  require("../src/utils/banner");

showBanner();

program
  .name("econ")
  .description("Economics CLI toolkit")
  .version("1.0.0");

require("../src/commands/elasticity")(program);
require("../src/commands/gdp")(program);

program.parse();