module.exports = function(program) {

  program
    .command("gdp")
    .description("Calculate GDP")
    .argument("<consumption>")
    .argument("<investment>")
    .argument("<government>")
    .argument("<netExports>")
    .action((c, i, g, nx) => {

      const gdp =
        Number(c) +
        Number(i) +
        Number(g) +
        Number(nx);

      console.log(`GDP: ${gdp}`);
    });
};