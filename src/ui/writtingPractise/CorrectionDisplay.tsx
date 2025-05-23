import { useTranslation } from "react-i18next";

interface Props {
  correction: { correctTranslation: string };
}

export const CorrectionDisplay = ({ correction }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="bg-green-50 border border-green-300 p-4 rounded-md">
      <h3 className="text-green-700 font-semibold mb-2">
        {t("correction.correctTranslation")}:
      </h3>
      <p className="text-gray-800">{correction.correctTranslation}</p>
    </div>
  );
};
