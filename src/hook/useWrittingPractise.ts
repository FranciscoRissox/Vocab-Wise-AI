import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { useBaseTexts } from "./useBaseTexts";
import { useAnswerState } from "./useAnswerState";
import { useCorrection } from "./useCorrection";
import type { CorrectionResult } from "./useCorrection";
import { useProgressTracker } from "./useProgress";
import { callableFunctions } from "../firebase/functions";
import type { WritingInteraction } from "../../shared/types/interaction";
import { convertToTimestamp } from "../utils";
import { Languages } from "../../shared/types/languages";
import type { Difficulty } from "../../shared/types/difficulty";

export const useWritingPractice = () => {
  const base = useBaseTexts();
  const answer = useAnswerState();
  const correction = useCorrection();
  const progress = useProgressTracker();
  

  const [settingsError, setSettingsError] = useState("")
  const [tempLanguage1,setTempLanguage1] = useState(base.language)
  const [tempLanguage2,setTempLanguage2] = useState(answer.language)
  const [tempDifficulty, setTempDifficulty] = useState(base.difficulty)

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
     
      fetchNextHistoryPage();
    }
  };

  useEffect(() => {
    fetchNextHistoryPage();
  }, []);

  const saveLanguages = () => {
   if(tempLanguage1===tempLanguage2){
    setSettingsError("language.error.sameLanguage");
    return;
   }
   setSettingsError("")
   base.setDifficulty(tempDifficulty)
   base.setLanguage(tempLanguage1);
   answer.setLanguage(tempLanguage2);
  };

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
      setLanguage: (l:Languages)=>setTempLanguage1(l),
      setDifficulty: (d:Difficulty)=>setTempDifficulty(d),
      tempLanguage:tempLanguage1,
      tempDifficulty:tempDifficulty
    },
    answer: {
      value: answer.value,
      language: answer.language,
      setValue: answer.setValue,
      setLanguage: (l:Languages)=>setTempLanguage2(l),
      tempLanguage:tempLanguage2
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
    saveLanguages,
    settingsError
  };
};
