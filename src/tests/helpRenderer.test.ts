import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultRegistry } from "../registry/defaultRegistry";
import { renderGlobalHelp } from "../renderers/helpRenderer";

test("global help includes all categories", () => {
  const output = renderGlobalHelp(createDefaultRegistry());

  assert.match(output, /microeconomics/);
  assert.match(output, /macroeconomics/);
  assert.match(output, /finance/);
});
