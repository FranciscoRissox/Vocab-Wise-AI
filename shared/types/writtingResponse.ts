import type { z } from "zod";
import type { evaluateResponseOutputSchema } from "./evaluateResponse";

export type WrittingResponse = z.infer<typeof evaluateResponseOutputSchema> & {
  createdAt: Date;
};
