import { useTranslation } from "react-i18next";

interface ButtonCondition {
  condition: boolean;
  label?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface Props {
  conditions: ButtonCondition[];
  className?: string;
}

export const MultiButton = ({ conditions, className }: Props) => {
  const { t } = useTranslation();

  const firstCondition = conditions.find((condition) => condition.condition);

  return (  
    <button
      onClick={firstCondition?.onClick}
      disabled={firstCondition?.disabled}
      className={`px-6 py-2 h-12 flex items-center justify-center font-semibold text-sm md:text-md rounded-md bg-blue-600 hover:bg-blue-700 text-white ${firstCondition?.disabled ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400" : ""} ${className}`}
    >
      {t(firstCondition?.label ?? "")}
    </button>
  );
};
