import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SystemMessage } from "./SystemMessage";
import { UserMessage } from "./UserMessage";
import { Corrections } from "./Corrections";
import { CorrectSentence } from "./CorrectSentence";

interface MessageProps {
  date: Date;
  systemMessage: string;
  userMessage: string;
  corrections?: { body: string }[];
  correctSentence: string;
}

export const Message = ({
  date,
  systemMessage,
  userMessage,
  corrections,
  correctSentence,
}: MessageProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-1"
    >
      <div className="flex justify-center text-sm text-gray-700">
        {date.toLocaleDateString()}
        {" - "}
        {date.toLocaleTimeString()}
      </div>

      <SystemMessage message={systemMessage} />
      <UserMessage message={userMessage} />
      
      {corrections?.length > 0 && (
        <Corrections corrections={corrections} />
      )}

      <CorrectSentence sentence={correctSentence} />
      <hr className="border-t border-gray-200 mt-2" />
    </motion.div>
  );
};
