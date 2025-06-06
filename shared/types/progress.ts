import { z } from "zod";

export const progressSchema = z.object({
  progress: z.number(),
  correctCount: z.number(),
  incorrectCount: z.number(),
  lastUpdate: z.date(),
});

export type Progress = z.infer<typeof progressSchema>;
