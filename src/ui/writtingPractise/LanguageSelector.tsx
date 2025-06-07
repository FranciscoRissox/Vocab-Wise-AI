import { Languages } from "../../../shared/types/languages";

interface Props {
  label: string;
  value: Languages;
  onChange: (lang: Languages) => void;
}

export const LanguageSelector = ({ label, value, onChange }: Props) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      <select
        value={value}
        onChange={(e: any) => {
          onChange(e.target.value as Languages)
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
      >
        {Object.values(Languages).map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </label>

  </div>
);
