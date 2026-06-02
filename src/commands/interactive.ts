import { Command } from "commander";
import { InteractiveDashboard } from "../interactive/dashboard";

export function registerInteractiveCommand(program: Command): void {
  program
    .command("interactive")
    .alias("i")
    .description("Start guided interactive terminal mode dashboard")
    .action(() => {
      const dashboard = new InteractiveDashboard();
      dashboard.render();
    });
}
