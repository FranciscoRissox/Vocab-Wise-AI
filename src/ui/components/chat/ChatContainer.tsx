import { useEffect, useRef } from "preact/hooks";
import type { WritingInteraction } from "../../../../shared/types/interaction";
import { AnimatePresence } from "framer-motion";
import { Message } from "./Message";

interface ChatContainerProps {
  history: WritingInteraction[];
  handleScroll: () => void;
  isLoading: boolean;
  className?: string;
}

export const ChatContainer = ({ history, handleScroll, isLoading, className }: ChatContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef<number>(0);
  const prevHistoryRef = useRef<WritingInteraction[]>(history);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prevHistory = prevHistoryRef.current;

    const isNewMessageAtEnd =
      prevHistory.length > 0
        ? history[history.length - 1].id !==
          prevHistory[prevHistory.length - 1].id
        : true;

    if (isNewMessageAtEnd) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newScrollHeight = container.scrollHeight;
          const scrollDelta = newScrollHeight - prevScrollHeight.current;
          container.scrollTop += scrollDelta;
          prevScrollHeight.current = newScrollHeight;
          prevHistoryRef.current = history;
        });
      });
      return;
    }

    prevScrollHeight.current = container.scrollHeight;
    prevHistoryRef.current = history;
  }, [history]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (container.scrollTop === 0) {
        handleScroll();
      }
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className= {`overflow-y-auto rounded-md p-4 space-y-4 bg-white shadow-inner ${className || ""}`}
      style={{
        pointerEvents: isLoading ? "none" : "",
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      <AnimatePresence initial={false} >
        {history.map((item) => (
          <Message
            key={item.id}
            date={item.parsedCreatedAt!}
            systemMessage={item.question}
            userMessage={item.userAnswer}
            corrections={item.corrections}
            correctSentence={item.correction}
          />
        ))}
      </AnimatePresence>
      <div ref={endRef} />
    </div>
  );
};
