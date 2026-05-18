import test from "node:test";
import assert from "node:assert/strict";

import { FormulaRegistry } from "../core/registry";
import { gdpFormula } from "../formulas/macroeconomics/gdp";

test("registry stores and retrieves formulas", () => {
  const registry = new FormulaRegistry();
  registry.register(gdpFormula);

  assert.equal(registry.getById("macroeconomics.gdp")?.name, "gdp");
  assert.equal(registry.listByCategory("macroeconomics").length, 1);
});
