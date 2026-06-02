import asciichart from "asciichart";
import { GraphOptions } from "../types";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import fs from "fs-extra";
import chalk from "chalk";

export class GraphEngine {
  /**
   * Renders a series of data points as an ASCII chart in the terminal.
   */
  public renderAscii(data: number[], options?: GraphOptions): void {
    const config = {
      height: options?.height || 15,
      colors: options?.colors || [asciichart.blue],
      padding: options?.padding || "       "
    };

    if (options?.title) {
      console.log(chalk.bold.cyan(`\n  ${options.title}\n`));
    }

    console.log(asciichart.plot(data, config));
  }

  /**
   * Renders a series of data points to a PNG image file.
   */
  public async renderImage(data: number[], outputPath: string, options?: GraphOptions): Promise<void> {
    const width = options?.width || 800;
    const height = options?.height || 600;

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    const configuration = {
      type: 'line' as const,
      data: {
        labels: data.map((_, i) => i.toString()),
        datasets: [{
          label: options?.title || 'Data',
          data: data,
          fill: false,
          borderColor: options?.colors?.[0] || 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        plugins: {
          title: {
            display: !!options?.title,
            text: options?.title || ''
          }
        },
        scales: {
          x: {
            title: {
              display: !!options?.xLabel,
              text: options?.xLabel || ''
            }
          },
          y: {
            title: {
              display: !!options?.yLabel,
              text: options?.yLabel || ''
            }
          }
        }
      }
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    await fs.writeFile(outputPath, image);
    console.log(chalk.green(`\n✔ Graph exported successfully to ${outputPath}\n`));
  }
}
