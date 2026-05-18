export type FormulaCategory = "microeconomics" | "macroeconomics" | "finance";

export interface FormulaArgument {
  key: string;
  label: string;
  description: string;
}

export interface ExplanationStep {
  title: string;
  detail: string;
}

export interface GraphSeries {
  title: string;
  values: number[];
}

export interface GraphPayload {
  series: GraphSeries[];
  xLabels?: string[];
}

export interface FormulaDefinition {
  id: string;
  category: FormulaCategory;
  name: string;
  description: string;
  arguments: FormulaArgument[];
  evaluate(inputs: number[]): number;
  explain(inputs: number[], result: number): ExplanationStep[];
  graph?(inputs: number[], result: number): GraphPayload;
}
