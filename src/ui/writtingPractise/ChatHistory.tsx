import { useEffect, useRef } from "preact/hooks";
import type { Interaction } from "../../../shared/types/interaction";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Props {
  history: Interaction[];
}

export const ChatHistory = ({ history }: Props) => {
  const { t } = useTranslation();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="h-90 overflow-y-auto rounded-md p-4 space-y-4 bg-white shadow-inner">
      <AnimatePresence initial={false}>
        {history.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1"
          >
            {/* System Message */}
            <div className="flex justify-start">
              <div>
                <span className="text-sm text-gray-500">
                  {t("chat.system")}:
                </span>
                <div className="ml-2 text-gray-800 italic border-l-2 border-blue-400 pl-2 bg-blue-50 rounded-md p-2 max-w-xs">
                  {item.question}
                </div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
              <div className="text-right">
                <span className="text-sm text-gray-500">{t("chat.you")}:</span>
                <div className="ml-2 text-gray-800 bg-gray-100 rounded-md p-2 max-w-xs">
                  {item.userAnswer}
                </div>
              </div>
            </div>

            {/* Corrections Message */}
            {item.corrections.length > 0 && (
              <>
                <div className="flex justify-start">
                  <span className="text-sm text-gray-500">
                    {t("chat.tipsAndCorrections")}:
                  </span>
                </div>
                {item.corrections.map((c, i) => (
                  <div className="flex justify-start" key={i}>
                    <div className="ml-2 text-yellow-700 bg-yellow-50 rounded-md p-2 max-w-xs">
                      ⚠️ {c.body}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Correction Message */}
            <div className="flex justify-start">
              <div>
                <span className="text-sm text-gray-500">
                  {t("chat.correctSentence")}:
                </span>
                <div className="ml-2 text-green-700 bg-green-50 rounded-md p-2 max-w-xs">
                  ✅ {item.correction}
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-200 mt-2" />
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={endRef} />
    </div>
  );
};
