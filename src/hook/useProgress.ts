import { useState } from "react";

export function useProgressTracker() {
  const [progress, setProgress] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const incrementProgress = () => {
    setProgress((prev) => (prev < 10 ? prev + 1 : prev));
  };

  const registerCorrect = () => {
    setCorrectCount((prev) => prev + 1);
    incrementProgress();
  };

  const registerIncorrect = () => {
    setIncorrectCount((prev) => prev + 1);
    incrementProgress();
  };

  const resetProgress = () => {
    setProgress(1);
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  return {
    progress,
    correctCount,
    incorrectCount,
    registerCorrect,
    registerIncorrect,
    resetProgress,
  };
}
