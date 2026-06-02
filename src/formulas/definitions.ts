import { Formula } from "../types";

export const elasticityFormula: Formula = {
  id: "elasticity",
  title: "Price Elasticity of Demand",
  category: "microeconomics",
  latex: "E_d = \\frac{\\% \\Delta Q}{\\% \\Delta P} = \\frac{\\frac{Q_2 - Q_1}{Q_1}}{\\frac{P_2 - P_1}{P_1}}",
  explanation: "Measures the responsiveness of the quantity demanded to a change in price.",
  variables: [
    { symbol: "Q1", name: "Initial Quantity", description: "Quantity demanded before the price change" },
    { symbol: "Q2", name: "New Quantity", description: "Quantity demanded after the price change" },
    { symbol: "P1", name: "Initial Price", description: "Price before the change" },
    { symbol: "P2", name: "New Price", description: "Price after the change" }
  ],
  examples: [
    {
      description: "Basic elasticity calculation",
      inputs: { Q1: 100, Q2: 90, P1: 10, P2: 12 },
      result: -0.5
    }
  ]
};

export const gdpFormula: Formula = {
  id: "gdp",
  title: "Gross Domestic Product (Expenditure Approach)",
  category: "macroeconomics",
  latex: "GDP = C + I + G + (X - M)",
  explanation: "Calculates the total value of all goods and services produced within a country's borders.",
  variables: [
    { symbol: "C", name: "Consumption", description: "Total consumer spending" },
    { symbol: "I", name: "Investment", description: "Business investments" },
    { symbol: "G", name: "Government Spending", description: "Total government expenditures" },
    { symbol: "X", name: "Exports", description: "Total value of exports" },
    { symbol: "M", name: "Imports", description: "Total value of imports" }
  ],
  examples: [
    {
      description: "Standard GDP calculation",
      inputs: { C: 1000, I: 500, G: 300, X: 200, M: 150 },
      result: 1850
    }
  ]
};

export const npvFormula: Formula = {
  id: "npv",
  title: "Net Present Value",
  category: "finance",
  latex: "NPV = \\sum_{t=1}^{n} \\frac{R_t}{(1+i)^t} - C_0",
  explanation: "Calculates the current value of a future series of cash flows, discounted at a specific rate.",
  variables: [
    { symbol: "Rt", name: "Cash flow", description: "Net cash flow for a single period" },
    { symbol: "i", name: "Discount rate", description: "Discount rate (e.g. 0.05 for 5%)" },
    { symbol: "t", name: "Time period", description: "The number of time periods" },
    { symbol: "C0", name: "Initial Investment", description: "Initial cash outlay" }
  ]
};
