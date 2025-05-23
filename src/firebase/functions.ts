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

const functions = getFunctions(app);

if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export const callableFunctions = {
  /* generateQuestion: httpsCallable<
    {
      languageGeneration: string;
      difficultyLevel: string;
      previousQuestions: string[];
    },
    string
  >(functions, "generateQuestion"),*/
  evaluateResponse: httpsCallable<
    Zod.infer<typeof evaluateResponseInputSchema>,
    Zod.infer<typeof evaluateResponseOutputSchema>
  >(functions, "evaluateResponse"),
};
