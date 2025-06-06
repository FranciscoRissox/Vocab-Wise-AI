import type { WritingInteraction } from "../../../shared/types/interaction";
import { ChatContainer } from "../components/chat/ChatContainer";

interface Props {
  history: WritingInteraction[];
  handleScroll: () => any;
  isLoading: boolean;
    className?: string;
}

export const ChatHistory = ({ history, handleScroll, isLoading, className }: Props) => {
  return (
    <ChatContainer
      history={history}
      handleScroll={handleScroll}
      isLoading={isLoading}
      className={className}
    />
  );
};
