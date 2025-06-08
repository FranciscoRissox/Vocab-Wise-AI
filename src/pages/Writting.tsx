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
    <div className="w-full p-6 flex">
      <Sidebar>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {t("settings")}
        </h3>
        
        <LanguageSelector
          label={t("fromLanguage")}
          value={hook.question.tempLanguage}
          onChange={hook.question.setLanguage}
        />
        <DifficultySelector
          value={hook.question.difficulty}
          onChange={hook.question.setDifficulty}
        />
        <LanguageSelector
          label={t("toLanguage")}
          value={hook.answer.tempLanguage}
          onChange={hook.answer.setLanguage}
        />
        <button className={"bg-blue-500 text-white px-4 py-2 rounded"} onClick={hook.saveLanguages}>
          {t("save")}
        </button>
        {hook.settingsError && <p className="text-red-500">{t(hook.settingsError)}</p>}
      </Sidebar>

      <main className="flex-1 h-[90vh] w-full sidebar:ml-[300px]  flex flex-col justify-start space-y-1 pt-2 md:pt-5 lg:pt-10 px-1 md:px-2">
        

        <ProgressPanel
          current={hook.progress.value}
          total={10}
          correct={hook.progress.correctCount}
          incorrect={hook.progress.incorrectCount}
          className="mt-10"
        />

        <ChatHistory
          history={hook.history}
          handleScroll={hook.handleScroll}
          isLoading={hook.isLoadingHistory}
          className="h-[60%] mt-2 mb-2"
        />

        <TextDisplay
          text={hook.question.text}
          language={hook.answer.language}
        />
        <form className="flex gap-2  w-full">
          <AnswerInput
            value={hook.answer.value}
            onChange={hook.answer.setValue}
            className="w-3/4"
          />

          <EvaluateButton
            onClick={hook.evaluateAnswer}
            disabled={hook.isEvaluating}
            limitReached={hook.progress.value === 10}
            className="w-1/4"
          />
        </form>

        {hook.progress.showNotice && <LimitNotice />}
      </main>
    </div>
  );
}
export default withAuthProtection(withEmailVerification(Writting));
