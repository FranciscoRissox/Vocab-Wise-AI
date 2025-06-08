import { useTranslation } from "react-i18next";

interface Props {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export const Input = ({ value, onChange, className }: Props) => {
  const { t } = useTranslation();

  return (

      <input
        type="text"
        placeholder={t("answerInput.placeholder")}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${className}`}
      />
  );
};
