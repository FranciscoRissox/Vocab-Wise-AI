import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import {
  evaluateResponseInputSchema,
  evaluateResponseOutputSchema,
} from "../../shared/types/evaluateResponse";
import app from ".";
import type { Progress } from "../../shared/types/progress";

const functions = getFunctions(app);

if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export const callableFunctions = {
  getWrittingProgress: httpsCallable<{}, Progress>(
    functions,
    "getWrittingProgress"
  ),
  evaluateResponse: httpsCallable<
    Zod.infer<typeof evaluateResponseInputSchema>,
    Zod.infer<typeof evaluateResponseOutputSchema> & { progress: Progress }
  >(functions, "evaluateWrittingResponse"),
};
