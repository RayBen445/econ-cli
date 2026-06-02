import fs from "fs-extra";
import path from "path";
import markdownpdf from "markdown-pdf";
import katex from "katex";
import { Formula, CalculationResult } from "../types";
import chalk from "chalk";

export class Exporter {
  /**
   * Export calculation result to Markdown.
   */
  public async exportToMarkdown(formula: Formula, result: CalculationResult, outputPath: string): Promise<void> {
    let md = `# ${formula.title}\n\n`;
    md += `**Formula**: ${formula.latex}\n\n`;
    md += `**Explanation**: ${formula.explanation}\n\n`;
    md += `## Step-by-Step Calculation\n\n`;
    
    result.steps.forEach(step => {
      md += `### Step ${step.step}: ${step.description}\n`;
      md += `$$ ${step.formulaState} $$\n\n`;
    });
    
    md += `## Result\n\n`;
    md += `**Value**: ${result.result}\n\n`;
    md += `**Interpretation**: ${result.interpretation}\n`;

    await fs.writeFile(outputPath, md);
    console.log(chalk.green(`✔ Exported to Markdown: ${outputPath}`));
  }

  /**
   * Export calculation result to PDF.
   */
  public async exportToPDF(formula: Formula, result: CalculationResult, outputPath: string): Promise<void> {
    // Generate temporary MD
    const tempMdPath = outputPath + ".temp.md";
    await this.exportToMarkdown(formula, result, tempMdPath);
    
    return new Promise((resolve, reject) => {
      markdownpdf().from(tempMdPath).to(outputPath, (err: any) => {
        if (err) {
          console.log(chalk.red(`✖ Failed to export to PDF: ${err.message}`));
          fs.unlinkSync(tempMdPath);
          reject(err);
        } else {
          console.log(chalk.green(`✔ Exported to PDF: ${outputPath}`));
          fs.unlinkSync(tempMdPath);
          resolve();
        }
      });
    });
  }

  /**
   * Render LaTeX string to terminal using KaTeX text approximation or simply print it.
   */
  public renderLatex(latexString: string): void {
    try {
      // KaTeX renders to HTML, but we just want to validate and output the raw string for the terminal
      // If the user wants a rendered image, we would use a different approach.
      // For now, we validate it compiles.
      katex.renderToString(latexString, { throwOnError: true });
      console.log(chalk.cyan(`LaTeX: ${latexString}`));
    } catch (e: any) {
      console.log(chalk.red(`Invalid LaTeX: ${e.message}`));
    }
  }

  /**
   * Export formula to JSON.
   */
  public async exportToJson(formula: Formula, result: CalculationResult, outputPath: string): Promise<void> {
    const data = {
      formula,
      calculation: result
    };
    await fs.writeJson(outputPath, data, { spaces: 2 });
    console.log(chalk.green(`✔ Exported to JSON: ${outputPath}`));
  }
}
