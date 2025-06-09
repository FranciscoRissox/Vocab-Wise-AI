import { useState } from "preact/hooks";
import { callableFunctions } from "../../../firebase/functions";
import { Languages } from "../../../../shared/types/languages";
import { useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export interface CorrectionResult {
  correctTranslation: string;
  corrections: { body: string }[];
}

interface EvaluationParams {
  baseText: string;
  baseTextLanguage: Languages;
  answerLanguage: Languages;
  answer: string;
}

const languageMap: Record<string, Languages> = {
  es: Languages.Español,
  pt: Languages.Portugues,
  en: Languages.English,
};

const getCorrectionLanguage = (i18nLanguage: string): string => {
  const languageCode = i18nLanguage.split("-")[0];
  return languageMap[languageCode as keyof typeof languageMap] || 
         (new LanguageDetector(null, {}).detect()! as string).split("-")[0];
};

export const useCorrection = () => {
  const [correction, setCorrection] = useState<CorrectionResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  const evaluate = async (params: EvaluationParams) => {
    if (!params.answer.trim()) {
      setError("Answer cannot be empty");
      return null;
    }

    setIsEvaluating(true);
    setError(null);

    try {
      const response = await callableFunctions.evaluateResponse({
        ...params,
        correctionLanguage: getCorrectionLanguage(String(i18n.language)) as Languages,
      });

      if (!response.data) {
        throw new Error("Invalid response from evaluation function");
      }

      setCorrection({
        corrections: response.data.corrections,
        correctTranslation: response.data.correction,
      });
      return response.data;
    } catch (err) {
      console.error("Error evaluating answer:", err);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      return null;
    } finally {
      setIsEvaluating(false);
    }
  };

  return {
    correction,
    error,
    evaluate,
    isEvaluating,
    reset: () => {
      setCorrection(null);
      setError(null);
    },
  };
};
