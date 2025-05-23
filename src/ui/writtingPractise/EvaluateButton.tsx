import { useTranslation } from "react-i18next";

interface Props {
  onClick: () => void;
  disabled: boolean;
  limitReached: boolean;
}

export const EvaluateButton = ({ onClick, disabled, limitReached }: Props) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      disabled={disabled || limitReached}
      className={`px-6 py-2 font-semibold rounded-md text-white ${
        disabled || limitReached
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {limitReached
        ? t("evaluate.limit")
        : disabled
        ? t("evaluate.evaluating")
        : t("evaluate.send")}
    </button>
  );
};
