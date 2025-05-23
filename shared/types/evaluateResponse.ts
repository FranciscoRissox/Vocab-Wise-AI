import { z } from "zod";
import { Languages } from "./languages.js";
export const evaluateResponseInputSchema = z.object({
  baseText: z.string(),
  baseTextLanguage: z.nativeEnum(Languages),
  answerLanguage: z.nativeEnum(Languages),
  answer: z.string(),
  correctionLanguage: z.nativeEnum(Languages),
});

export const evaluateResponseOutputSchema = z.object({
  corrections: z.array(z.object({ body: z.string() })),
  correctTranslation: z.string(),
});
