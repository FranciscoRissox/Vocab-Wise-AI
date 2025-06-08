import { useTranslation } from "react-i18next";
import { withAuthProtection } from "../hoc/withAuthProtection";
import { useWritingPractice } from "../hook/useWrittingPractise";
import { Sidebar } from "../ui/Sidebar";
import { Input } from "../ui/Input";
import { MultiButton } from "../ui/MultiButton";
import { ProgressPanel } from "../ui/writtingPractise/ProgressPanel";
import { Quote } from "../ui/Quote";
import withEmailVerification from "../hoc/withEmailVerification";
import { LimitNotice } from "../ui/LimitNotice";
import { Select } from "../ui/Select";
import { Difficulty } from "../../shared/types/difficulty";
import { Languages } from "../../shared/types/languages";
import { Chat } from "../ui/components/chat";

function Writting() {
  const hook = useWritingPractice();
  const { t } = useTranslation();

  return (
    <div className="w-full p-6 flex">
      <Sidebar>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {t("settings")}
        </h3>
        
        <Select<Languages>
          value={hook.question.tempLanguage}
          onChange={hook.question.setLanguage}
          options={Object.values(Languages).map((lang) => ({
            value: lang,
            label: lang,
          }))}
          label={t("fromLanguage")}
        />
        <Select<Difficulty>
          value={hook.question.difficulty}
          onChange={hook.question.setDifficulty}
          options={Object.values(Difficulty).map((diff) => ({
            value: diff,
            label: t(`difficulty.levels.${diff}`),
          }))}
          label={t("difficulty.label")}
        />
        <Select<Languages>
          value={hook.answer.tempLanguage}
          onChange={hook.answer.setLanguage}
          options={Object.values(Languages).map((lang) => ({
            value: lang,
            label: lang,
          }))}
          label={t("toLanguage")}
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

        <Chat
          history={hook.history}
          handleScroll={hook.handleScroll}
          isLoading={hook.isLoadingHistory}
          className="h-[60%] mt-2 mb-2"
        />

        <Quote
          text={hook.question.text}
          title={t("textDisplay.translateTo", { language:hook.answer.language })}
        />
        <form className="flex gap-2  w-full">
          <Input
            value={hook.answer.value}
            onChange={hook.answer.setValue}
            className="w-3/4"
          />

          <MultiButton
            conditions={[
              {
                condition: hook.progress.value === 10,
                label: "evaluate.limit",disabled:true
              },{ 
                condition: hook.isEvaluating,
                label: "evaluate.evaluating",disabled:true
              },{
                condition: hook.answer.value.trim() === "",
                label: "evaluate.emptyAnswer",disabled:true
              },{
                condition: !hook.isEvaluating,
                label: "evaluate.send",
                onClick:hook.evaluateAnswer
              }
            ]}
            className="w-1/4"
          />
        </form>

        {hook.progress.showNotice && <LimitNotice text={t("limitReached")}/>}
      </main>
    </div>
  );
}
export default withAuthProtection(withEmailVerification(Writting));
