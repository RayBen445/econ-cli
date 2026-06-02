import { defaultRegistry } from "./registry";
import { elasticityFormula, gdpFormula, npvFormula } from "./definitions";

// Register default formulas
defaultRegistry.register(elasticityFormula);
defaultRegistry.register(gdpFormula);
defaultRegistry.register(npvFormula);

export { defaultRegistry };
export * from "./registry";
export * from "./definitions";
