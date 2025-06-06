import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import { evaluateResponseInputSchema } from "../../shared/types/evaluateResponse";
import app from ".";
import type { Progress } from "../../shared/types/progress";
import type { WritingInteraction } from "../../shared/types/interaction";

const functions = getFunctions(app);

if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export const callableFunctions = {
  getWritingProgress: httpsCallable<{}, Progress>(
    functions,
    "getWritingProgress"
  ),
  getWritingResponseHistory: httpsCallable<
    { offset: number | null; firstLoading?: boolean },
    {
      writingResponses: WritingInteraction[];
      nextOffset: number;
      total?: number;
    }
  >(functions, "getWritingResponseHistory"),
  evaluateResponse: httpsCallable<
    Zod.infer<typeof evaluateResponseInputSchema>,
    WritingInteraction & { progress: Progress }
  >(functions, "evaluateWritingResponse"),
};
