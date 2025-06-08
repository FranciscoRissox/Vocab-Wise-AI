import { useTranslation } from "react-i18next";

interface SelectOption {
  value: string;
  label: string;
}

interface Props<T> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption[];
}

export const Select = <T extends string>({ label, value, onChange, options }: Props<T>) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t(label)}
      </label>
      <select
        value={value}
        onChange={(e: any) => onChange(e.target.value as T)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </div>
  );
};
