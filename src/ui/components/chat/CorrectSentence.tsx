import { useTranslation } from "react-i18next";

interface CorrectSentenceProps {
  sentence: string;
}

export const CorrectSentence = ({ sentence }: CorrectSentenceProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-start">
      <div>
        <span className="text-sm text-gray-500">
          {t("chat.correctSentence")}:
        </span>
        <div className="ml-2 text-green-700 bg-green-50 rounded-md p-2 max-w-xs">
          ✅ {sentence}
        </div>
      </div>
    </div>
  );
};
