module.exports = function(program) {

  program
    .command("elasticity")
    .description("Calculate price elasticity")
    .argument("<changeInDemand>")
    .argument("<changeInPrice>")
    .action((demand, price) => {

      const elasticity =
        Number(demand) / Number(price);

      console.log(`Elasticity: ${elasticity}`);
    });
};