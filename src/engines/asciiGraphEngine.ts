import * as asciichart from "asciichart";

import { GraphEngine } from "../core/graph";
import { GraphPayload } from "../core/formula";

export class AsciiGraphEngine implements GraphEngine {
  render(payload: GraphPayload): string {
    const numericSeries = payload.series.map((series) => series.values);
    const chart = asciichart.plot(numericSeries.length === 1 ? numericSeries[0] : numericSeries, {
      height: 8
    });

    const legend = payload.series.map((series, index) => `${index + 1}. ${series.title}`).join("\n");

    return `${chart}\n${legend}`;
  }
}
