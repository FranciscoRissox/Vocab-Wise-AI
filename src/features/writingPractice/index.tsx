import { useTranslation } from "react-i18next";
import { useWritingPractice } from "./hooks/useWrittingPractise";
import { ConfigSidebar } from "./components/ConfigSidebar";
import { ProgressPanel } from "../../components/ProgressPanel";
import { Chat } from "./components/chat";
import { LimitNotice } from "../../components/LimitNotice";
import { AnswerInput } from "./components/AnswerInput";

function WritingPractice() {
  const hook = useWritingPractice();
  const { t } = useTranslation();

  return (
    <div className="w-full p-6 flex">
      <ConfigSidebar hook={hook} />
      <main className="flex-1 h-[90vh] w-full sidebar:ml-[300px] flex flex-col justify-start space-y-1 pt-2 md:pt-5 lg:pt-10 px-1 md:px-2">
        <ProgressPanel
          current={hook.progress.value}
          total={10}
          correct={hook.progress.correctCount}
          incorrect={hook.progress.incorrectCount}
          className="mt-10"
        />
        <Chat
          history={hook.history}
          handleScroll={hook.handleScroll}
          isLoading={hook.isLoadingHistory}
          className="h-[60%] mt-2 mb-2"
        />
        <AnswerInput hook={hook} />
        {hook.progress.showNotice && <LimitNotice text={t("limitReached")} />}
      </main>
    </div>
  );
}

export default WritingPractice;
