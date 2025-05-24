import { useTranslation } from "react-i18next";
import { withAuthProtection } from "../hoc/withAuthProtection";
import { useWritingPractice } from "../hook/useWrittingPractise";
import { Sidebar } from "../ui/Sidebar";
import { AnswerInput } from "../ui/writtingPractise/AnswerInput";
import { ChatHistory } from "../ui/writtingPractise/ChatHistory";
import { DifficultySelector } from "../ui/writtingPractise/DifficultySelector";
import { EvaluateButton } from "../ui/writtingPractise/EvaluateButton";
import { LanguageSelector } from "../ui/writtingPractise/LanguageSelector";
import { ProgressPanel } from "../ui/writtingPractise/ProgressPanel";
import { TextDisplay } from "../ui/writtingPractise/TextDisplay";
import withEmailVerification from "../hoc/withEmailVerification";
import { LimitNotice } from "../ui/writtingPractise/LimitNotice";

function Writting() {
  const hook = useWritingPractice();
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto p-6 flex">
      <Sidebar>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {t("settings")}
        </h3>
        <LanguageSelector
          label={t("fromLanguage")}
          value={hook.question.language}
          onChange={hook.question.setLanguage}
        />
        <DifficultySelector
          value={hook.question.difficulty}
          onChange={hook.question.setDifficulty}
        />
        <LanguageSelector
          label={t("toLanguage")}
          value={hook.answer.language}
          onChange={hook.answer.setLanguage}
        />
      </Sidebar>

      <main className="flex-1 max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {t("writingPractice")}
        </h2>

        <ProgressPanel
          current={hook.progress.value}
          total={10}
          correct={hook.progress.correctAccount}
          incorrect={hook.progress.incorrectAccount}
        />

        <ChatHistory history={hook.history} />

        <TextDisplay
          text={hook.question.text}
          language={hook.answer.language}
        />
        <form>
          <AnswerInput
            value={hook.answer.value}
            onChange={hook.answer.setValue}
          />

          <EvaluateButton
            onClick={hook.evaluateAnswer}
            disabled={hook.isEvaluating}
            limitReached={hook.progress.value === 10}
          />
        </form>

        {hook.progress.showNotice && <LimitNotice />}
      </main>
    </div>
  );
}
export default withAuthProtection(withEmailVerification(Writting));
