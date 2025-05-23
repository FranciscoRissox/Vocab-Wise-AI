import { useTranslation } from "react-i18next";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const AnswerInput = ({ value, onChange }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t("answerInput.label")}
      </label>
      <input
        type="text"
        placeholder={t("answerInput.placeholder")}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );
};
