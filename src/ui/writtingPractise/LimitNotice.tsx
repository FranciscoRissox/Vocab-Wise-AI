import { useTranslation } from "react-i18next";

export const LimitNotice = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-yellow-400 text-black py-2 px-4 animate-pulse shadow-md text-center font-semibold">
      {t("limitReached")}
    </div>
  );
};
