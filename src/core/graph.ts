import { GraphPayload } from "./formula";

export interface GraphEngine {
  render(payload: GraphPayload): string;
}
