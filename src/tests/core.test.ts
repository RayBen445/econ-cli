import { calculatePriceElasticity } from "../core/microeconomics/elasticity";
import { calculateGDP } from "../core/macroeconomics/gdp";
import { calculateNPV } from "../core/finance/npv";

describe("EconLab Core Engines", () => {
  test("calculates elasticity correctly", () => {
    const result = calculatePriceElasticity(100, 90, 10, 12);
    expect(result.result).toBeCloseTo(-0.5);
  });

  test("calculates GDP correctly", () => {
    const result = calculateGDP(1000, 500, 300, 200, 150);
    expect(result.result).toBe(1850);
  });

  test("calculates NPV correctly", () => {
    const result = calculateNPV([100, 100], 0.1, 150);
    expect(result.result).toBeCloseTo(23.55);
  });
});
