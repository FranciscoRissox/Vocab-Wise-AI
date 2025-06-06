import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { useBaseTexts } from "./useBaseTexts";
import { useAnswerState } from "./useAnswerState";
import { useCorrection } from "./useCorrection";
import type { CorrectionResult } from "./useCorrection";
import { useProgressTracker } from "./useProgress";
import { callableFunctions } from "../firebase/functions";
import type { WritingInteraction } from "../../shared/types/interaction";
import { convertToTimestamp } from "../utils";

export const useWritingPractice = () => {
  const base = useBaseTexts();
  const answer = useAnswerState();
  const correction = useCorrection();
  const progress = useProgressTracker();

  const [history, setHistory] = useState<WritingInteraction[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalHistory, setTotalHistory] = useState<number | null>(null);
  //const [nextSnapshot, setNextSnapshot] = useState<string | null>(null);
  //const fetchedDatesRef = useRef<Set<string | null>>(new Set());

  const fetchNextHistoryPage = async () => {
    if (totalHistory && totalHistory === history.length) return;
    setIsLoadingHistory(true);
    const response = await callableFunctions.getWritingResponseHistory({
      offset: offset,
      ...(!totalHistory ? { firstLoading: true } : {}),
    });

    setOffset(response.data.nextOffset);
    if (response.data.total) setTotalHistory(response.data.total);
    const parsedHistory = response.data.writingResponses.map((d) => ({
      ...d,
      parsedCreatedAt: convertToTimestamp(d.createdAt).toDate(),
    }));
    setHistory((prev) =>
      [...parsedHistory, ...prev]
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        )
        .sort(
          (a, b) => a.parsedCreatedAt!.getTime() - b.parsedCreatedAt!.getTime()
        )
    );
    setIsLoadingHistory(false);
  };

  const handleScroll = () => {
    const reachedBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (reachedBottom) {
      // const firstDate =
      //  history.length > 0 ? history[history.length - 1].createdAt : null;
      fetchNextHistoryPage();
    }
  };

  useEffect(() => {
    fetchNextHistoryPage();
  }, []); // fetch inicial

  const evaluateAnswer = useCallback(async () => {
    const result = await correction.evaluate({
      baseText: base.currentText,
      baseTextLanguage: base.language,
      answerLanguage: answer.language,
      answer: answer.value,
    });

    if (!result) return;

    setHistory((prev) => [
      ...prev,
      {
        ...result,
        parsedCreatedAt: convertToTimestamp(result.createdAt).toDate(),
      },
    ]);
    progress.updateProgress(result.progress);
    answer.reset();
    base.loadNextText();
  }, [answer, base, correction]);

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
      correctCount: progress.correctCount,
      incorrectCount: progress.incorrectCount,
      showNotice: progress.showNotice,
    },
    correction: correction.correction,
    isEvaluating: correction.isEvaluating,
    evaluateAnswer,
    loadNewQuestion: base.loadNextText,
    history,
    handleScroll,
    isLoadingHistory,
  };
};
