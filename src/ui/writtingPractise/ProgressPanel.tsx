import { useTranslation } from "react-i18next";

interface ProgressPanelProps {
  current: number;
  total: number;
  correct: number;
  incorrect: number;
}

export function ProgressPanel({
  current,
  total,
  correct,
  incorrect,
}: ProgressPanelProps) {
  const { t } = useTranslation();
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {t("progress.title")}
      </h3>

      <div className="mb-3">
        <progress
          value={percentage}
          max={100}
          className="w-full h-3 rounded bg-gray-200 [&::-webkit-progress-bar]:rounded [&::-webkit-progress-value]:bg-blue-600"
        />
        <div className="text-sm text-gray-600 mt-1 text-right">
          {current}/{total}
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-700">
        <div>
          ✅ {t("progress.correct")}{" "}
          <span className="font-bold text-green-600">{correct}</span>
        </div>
        <div>
          ❌ {t("progress.incorrect")}{" "}
          <span className="font-bold text-red-600">{incorrect}</span>
        </div>
      </div>
    </div>
  );
}
