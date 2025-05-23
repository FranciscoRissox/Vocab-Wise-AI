import { useState } from "preact/hooks";
import { Languages } from "../../shared/types/languages";

export const useAnswerState = () => {
  const [language, setLanguage] = useState(Languages.English);
  const [value, setValue] = useState("");

  const reset = () => setValue("");

  return {
    language,
    setLanguage,
    value,
    setValue,
    reset,
  };
};
