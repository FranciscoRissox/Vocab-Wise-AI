import { useTranslation } from "react-i18next";
import { withAuthProtection } from "../hoc/withAuthProtection";
import { Input } from "../components/Input";
import { MultiButton } from "../components/MultiButton";
import { ProgressPanel } from "../components/ProgressPanel";
import { Quote } from "../components/Quote";
import withEmailVerification from "../hoc/withEmailVerification";
import { LimitNotice } from "../components/LimitNotice";
import { Chat } from "../features/writingPractice/components/chat";
import { useWritingPractice } from "../features/writingPractice/hooks/useWrittingPractise";
import { ConfigSidebar } from "../features/writingPractice/components/ConfigSidebar";

function Writting() {
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
        <Quote
          text={hook.question.text}
          title={t("textDisplay.translateTo", { language: hook.answer.language })}
        />
        <form className="flex gap-2 w-full">
          <Input
            value={hook.answer.value}
            onChange={hook.answer.setValue}
            className="w-3/4"
          />
          <MultiButton
            conditions={[
              {
                condition: hook.progress.value === 10,
                label: "evaluate.limit",
                disabled: true,
              },
              {
                condition: hook.isEvaluating,
                label: "evaluate.evaluating",
                disabled: true,
              },
              {
                condition: hook.answer.value.trim() === "",
                label: "evaluate.emptyAnswer",
                disabled: true,
              },
              {
                condition: !hook.isEvaluating,
                label: "evaluate.send",
                onClick: hook.evaluateAnswer,
              },
            ]}
            className="w-1/4"
          />
        </form>
        {hook.progress.showNotice && <LimitNotice text={t("limitReached")} />}
      </main>
    </div>
  );
}

export default withAuthProtection(withEmailVerification(Writting));
