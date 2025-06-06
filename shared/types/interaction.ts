import { type Timestamp } from "../../node_modules/firebase-admin/lib/firestore";
export type WritingInteraction = {
  id?: string; // uuid
  question: string;
  userAnswer: string;
  correction: string;
  isCorrect: boolean;
  createdAt: Timestamp;
  parsedCreatedAt?: Date;
  corrections: { body: string }[];
};
