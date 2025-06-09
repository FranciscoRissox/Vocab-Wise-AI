import { Input } from "../../../components/Input";
import { MultiButton } from "../../../components/MultiButton";
import { Quote } from "../../../components/Quote";
import { useWritingPractice } from "../hooks/useWrittingPractise";
import { useTranslation } from "react-i18next";

export const AnswerInput = ({ hook }: { hook: ReturnType<typeof useWritingPractice> }) => {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};