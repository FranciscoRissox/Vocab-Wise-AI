import { useTranslation } from "react-i18next";
import type { Languages } from "../../../shared/types/languages";

interface Props {
  text: string;
  language: Languages;
}

export const TextDisplay = ({ text, language }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="text-lg font-medium text-gray-800">
        {t("textDisplay.translateTo", { language })}
      </p>
      <p className="text-gray-600 italic border-l-4 border-blue-500 pl-4 mt-2">
        {text}
      </p>
    </div>
  );
};
