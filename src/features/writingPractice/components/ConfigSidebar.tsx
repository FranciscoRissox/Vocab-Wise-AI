import { useTranslation } from "react-i18next";
import { Difficulty } from "../../../../shared/types/difficulty";
import { Languages } from "../../../../shared/types/languages";
import { Select } from "../../../components/Select";
import { Sidebar } from "../../../components/Sidebar";
import { useWritingPractice } from "../hooks/useWrittingPractise";

export const ConfigSidebar = ({ hook }: { hook: ReturnType<typeof useWritingPractice> }) => {
  const { t } = useTranslation();

  return (
    <Sidebar>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{t("settings")}</h3>

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

      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={hook.saveLanguages}>
        {t("save")}
      </button>

      {hook.settingsError && <p className="text-red-500">{t(hook.settingsError)}</p>}
    </Sidebar>
  );
};
