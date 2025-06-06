import { useEffect, useRef } from "preact/hooks";
import type { WritingInteraction } from "../../../shared/types/interaction";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChatContainer } from "../components/chat/ChatContainer";

interface Props {
  history: WritingInteraction[];
  handleScroll: () => any;
  isLoading: boolean;
}

export const ChatHistory = ({ history, handleScroll, isLoading }: Props) => {
  return (
    <ChatContainer
      history={history}
      handleScroll={handleScroll}
      isLoading={isLoading}
    />
  );
};
