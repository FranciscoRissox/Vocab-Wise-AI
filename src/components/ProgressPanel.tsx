import { useTranslation } from "react-i18next";

interface ProgressPanelProps {
  current: number;
  total: number;
  correct: number;
  incorrect: number;
className?: string;
}

export function ProgressPanel({
  current,
  total,
  correct,
  incorrect,className
}: ProgressPanelProps) {
  const { t } = useTranslation();
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className={`w-full bg-white border rounded-lg shadow p-4 ${className || ""}`} >
      <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-gray-800">
        {t("progress.title")}
      </h3>
      <div className="text-sm text-gray-600 mt-1 text-right">
          {current}/{total}
        </div>
      </div>
     
      <div className="mb-3">
        <progress
          value={percentage}
          max={100}
          className="w-full h-2 sm:h-3 md:h-4 lg:h-5 [&::-webkit-progress-bar]:rounded [&::-webkit-progress-value]:bg-blue-600"
        />
      </div>

      <div className="flex justify-between space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-5 text-xs sm:text-sm md:text-base lg:text-lg text-gray-700">
        <div className="flex items-center">
          <span className="text-green-600">✅</span>
          <span className="ml-1">{t("progress.correct")}</span>
          <span className="ml-1 font-bold text-green-600">{correct}</span>
        </div>
        <div className="flex items-center">
          <span className="text-red-600">❌</span>
          <span className="ml-1">{t("progress.incorrect")}</span>
          <span className="ml-1 font-bold text-red-600">{incorrect}</span>
        </div>
      </div>
    </div>
  );
}
