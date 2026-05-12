#!/usr/bin/env node

const { Command } = require("commander");

const program = new Command();

program
  .name("econ")
  .description("Economics CLI toolkit")
  .version("1.0.0");

program
  .command("elasticity")
  .description("Calculate price elasticity")
  .argument("<changeInDemand>")
  .argument("<changeInPrice>")
  .action((demand, price) => {
    const result = Number(demand) / Number(price);
    console.log(`Elasticity: ${result}`);
  });

program.parse();
