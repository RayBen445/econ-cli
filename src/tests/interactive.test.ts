import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultRegistry } from "../registry/defaultRegistry";

test("default registry contains formulas used by interactive mode", () => {
  const registry = createDefaultRegistry();

  assert.equal(registry.listByCategory("microeconomics").length > 0, true);
  assert.equal(registry.listByCategory("macroeconomics").length > 0, true);
  assert.equal(registry.listByCategory("finance").length > 0, true);
});
