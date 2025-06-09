import { useTranslation } from "react-i18next";

interface UserMessageProps {
  message: string;
}

export const UserMessage = ({ message }: UserMessageProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end">
      <div className="text-right">
        <span className="text-sm text-gray-500">
          {t("chat.you")}:
        </span>
        <div className="ml-2 text-gray-800 bg-gray-100 rounded-md p-2 max-w-xs">
          {message}
        </div>
      </div>
    </div>
  );
};
