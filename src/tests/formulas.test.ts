import test from "node:test";
import assert from "node:assert/strict";

import { runFormula } from "../application/calculationService";
import { elasticityFormula } from "../formulas/microeconomics/elasticity";
import { gdpFormula } from "../formulas/macroeconomics/gdp";
import { npvFormula } from "../formulas/finance/npv";

test("elasticity formula supports explanation", () => {
  const result = runFormula(elasticityFormula, [-10, 5]);

  assert.equal(result.value, -2);
  assert.equal(result.steps.length > 0, true);
});

test("gdp formula sums expenditure components", () => {
  const result = runFormula(gdpFormula, [100, 20, 30, -10]);

  assert.equal(result.value, 140);
});

test("npv formula discounts cash flows", () => {
  const result = runFormula(npvFormula, [0.1, -100, 60, 60]);

  assert.equal(Math.round(result.value), 4);
});
