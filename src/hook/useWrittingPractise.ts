import { useCallback, useState } from "preact/hooks";
import { useBaseTexts } from "./useBaseTexts";
import { useAnswerState } from "./useAnswerState";
import { useCorrection } from "./useCorrection";
import type { Interaction } from "../../shared/types/interaction";
import { v4 as uuidv4 } from "uuid";
import { useProgressTracker } from "./useProgress";

export const useWritingPractice = () => {
  const base = useBaseTexts();
  const answer = useAnswerState();
  const correctionState = useCorrection();
  const progress = useProgressTracker();
  const [history, setHistory] = useState<Interaction[]>([]);

  const evaluateAnswer = useCallback(async () => {
    const correction = await correctionState.evaluate({
      baseText: base.currentText,
      baseTextLanguage: base.language,
      answerLanguage: answer.language,
      answer: answer.value,
    });

    if (correction) {
      setHistory((prev) => [
        ...prev,
        {
          id: uuidv4(),
          question: base.currentText,
          userAnswer: answer.value,
          correction: correction.correctTranslation,
          corrections: correction.corrections,
        },
      ]);

      if (correction.corrections.length === 0) {
        progress.registerCorrect();
      } else {
        progress.registerIncorrect();
      }

      answer.reset();
      base.loadNextText();
    }
  }, [answer, base, correctionState]);

  return {
    question: {
      text: base.currentText,
      language: base.language,
      difficulty: base.difficulty,
      setLanguage: base.setLanguage,
      setDifficulty: base.setDifficulty,
    },
    answer: {
      value: answer.value,
      language: answer.language,
      setValue: answer.setValue,
      setLanguage: answer.setLanguage,
    },
    progress: {
      value: progress.progress,
      correctAccount: progress.correctCount,
      incorrectAccount: progress.incorrectCount,
    },
    correction: correctionState.correction,
    isEvaluating: correctionState.isEvaluating,
    evaluateAnswer,
    history,
    loadNewQuestion: base.loadNextText,
  };
};
