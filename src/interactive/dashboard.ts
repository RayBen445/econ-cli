import blessed from "blessed";
import * as contrib from "blessed-contrib";
import { defaultRegistry } from "../formulas";
import { getThemeConfig } from "../themes";

export class InteractiveDashboard {
  private screen: blessed.Widgets.Screen;
  private grid: any;

  constructor() {
    this.screen = blessed.screen({
      smartCSR: true,
      title: "EconLab Interactive Dashboard"
    });

    this.grid = new contrib.grid({ rows: 12, cols: 12, screen: this.screen });

    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape', 'q', 'C-c'], (ch, key) => {
      return process.exit(0);
    });
  }

  public render(): void {
    const theme = getThemeConfig();

    // Markdown Panel (Formulas)
    const markdown = this.grid.set(0, 0, 8, 4, contrib.markdown, {
      label: " Formula Registry ",
      style: {
        border: { fg: theme.primary },
        text: theme.text
      }
    });

    let mdText = "# Available Formulas\n\n";
    defaultRegistry.list().forEach(f => {
      mdText += `**${f.title}** (${f.category})\n`;
      mdText += `> ${f.explanation}\n\n`;
    });
    markdown.setMarkdown(mdText);

    // Line Chart (Dummy Data)
    const line = this.grid.set(0, 4, 8, 8, contrib.line, {
      label: " Market Graph ",
      showLegend: true,
      style: {
        line: theme.secondary,
        text: theme.text,
        baseline: theme.text,
        border: { fg: theme.primary }
      }
    });

    const series1 = {
      title: "Demand",
      x: ["1", "2", "3", "4", "5", "6"],
      y: [100, 80, 60, 40, 20, 0],
      style: { line: theme.error }
    };
    const series2 = {
      title: "Supply",
      x: ["1", "2", "3", "4", "5", "6"],
      y: [0, 20, 40, 60, 80, 100],
      style: { line: theme.success }
    };
    line.setData([series1, series2]);

    // Log Panel
    const log = this.grid.set(8, 0, 4, 12, contrib.log, {
      label: " Event Log ",
      fg: theme.success,
      border: { type: "line", fg: theme.primary }
    });
    
    log.log("EconLab Dashboard Initialized.");
    log.log(`Active Theme: ${theme.primary} / ${theme.secondary}`);
    log.log("Use 'q' or 'ESC' to quit.");

    this.screen.render();
  }
}
