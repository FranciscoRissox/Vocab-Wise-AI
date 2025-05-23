import { Difficulty } from "../../../shared/types/difficulty";
import { useTranslation } from "react-i18next";

interface Props {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
}

export const DifficultySelector = ({ value, onChange }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t("difficulty.label")}
      </label>
      <select
        value={value}
        onChange={(e: any) => onChange(e.target.value as Difficulty)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
      >
        {Object.values(Difficulty).map((diff) => (
          <option key={diff} value={diff}>
            {t(`difficulty.levels.${diff}`)}
          </option>
        ))}
      </select>
    </div>
  );
};
