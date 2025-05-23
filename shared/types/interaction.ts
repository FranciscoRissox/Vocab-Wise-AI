export type Interaction = {
  id: string; // uuid
  question: string;
  userAnswer: string;
  correction: string;
  corrections: { body: string }[];
};
