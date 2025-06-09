import { useEffect, useState } from "react";
import { callableFunctions } from "../../../firebase/functions";
import type { Progress } from "../../../../shared/types/progress";

export function useProgressTracker() {
  const [progress, setProgress] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    callableFunctions.getWritingProgress().then((res) => {
      setProgress(res.data.progress);
      setCorrectCount(res.data.correctCount);
      setIncorrectCount(res.data.incorrectCount);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (progress === 10) {
      setShowNotice(true);
    }
  }, [progress]);

  const updateProgress = (progress: Progress) => {
    setProgress(progress.progress);
    setCorrectCount(progress.correctCount);
    setIncorrectCount(progress.incorrectCount);
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
    updateProgress,
    resetProgress,
    loading,
    showNotice,
  };
}
