import { ExplanationStep } from "../core/formula";
import { color } from "./colors";

export function renderExplanation(steps: ExplanationStep[]): void {
  console.log(color.title("Step-by-step explanation"));

  for (const [index, step] of steps.entries()) {
    console.log(`${color.accent(`${index + 1}. ${step.title}`)}: ${step.detail}`);
  }
}
