import { CalculationResult } from "../application/calculationService";
import { GraphEngine } from "../core/graph";
import { color } from "./colors";
import { renderExplanation } from "./explanationRenderer";

export interface RenderOptions {
  explain: boolean;
  graph: boolean;
}

export function renderResult(result: CalculationResult, graphEngine: GraphEngine, options: RenderOptions): void {
  console.log(color.success(`${result.formulaName.toUpperCase()} Result: ${result.value}`));

  if (options.explain) {
    renderExplanation(result.steps);
  }

  if (options.graph && result.graph) {
    console.log(color.title("Graph"));
    console.log(graphEngine.render(result.graph));
  }
}
