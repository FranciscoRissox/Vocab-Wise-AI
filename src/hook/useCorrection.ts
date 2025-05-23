import { useState } from "preact/hooks";
import { callableFunctions } from "../firebase/functions";
import { Languages } from "../../shared/types/languages";
import { useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const languageMap = {
  es: Languages.Español,
  pt: Languages.Portugues,
  en: Languages.English,
};

console.log((new LanguageDetector(null, {}).detect()! as string).split("-")[0]);

export const useCorrection = () => {
  const [correction, setCorrection] = useState<{
    correctTranslation: string;
    corrections: { body: string }[];
  } | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const { i18n } = useTranslation();
  const evaluate = async ({
    baseText,
    baseTextLanguage,
    answerLanguage,
    answer,
  }: {
    baseText: string;
    baseTextLanguage: Languages;
    answerLanguage: Languages;
    answer: string;
  }) => {
    if (!answer.trim()) return null;
    setIsEvaluating(true);
    try {
      const response = await callableFunctions.evaluateResponse({
        baseText,
        baseTextLanguage,
        answerLanguage,
        answer,
        correctionLanguage:
          languageMap[
            (String(i18n.language).split("-")[0] as "es" | "pt" | "en") ||
              (new LanguageDetector(null, {}).detect()! as string).split("-")[0]
          ],
      });
      setCorrection(response.data);
      return response.data;
    } catch (err) {
      console.error("Error evaluating answer:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return {
    correction,
    evaluate,
    isEvaluating,
    reset: () => setCorrection(null),
  };
};
