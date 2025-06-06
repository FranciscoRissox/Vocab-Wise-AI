import { useTranslation } from "react-i18next";

interface CorrectionsProps {
  corrections: { body: string }[];
}

export const Corrections = ({ corrections }: CorrectionsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-start">
        <span className="text-sm text-gray-500">
          {t("chat.tipsAndCorrections")}:
        </span>
      </div>
      {corrections.map((correction, index) => (
        <div key={index} className="flex justify-start">
          <div className="ml-2 text-yellow-700 bg-yellow-50 rounded-md p-2 max-w-xs">
            ⚠️ {correction.body}
          </div>
        </div>
      ))}
    </>
  );
};
