import { useTranslation } from "react-i18next";

interface SystemMessageProps {
  message: string;
}

export const SystemMessage = ({ message }: SystemMessageProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-start">
      <div>
        <span className="text-sm text-gray-500">
          {t("chat.system")}:
        </span>
        <div className="ml-2 text-gray-800 italic border-l-2 border-blue-400 pl-2 bg-blue-50 rounded-md p-2 max-w-xs">
          {message}
        </div>
      </div>
    </div>
  );
};
