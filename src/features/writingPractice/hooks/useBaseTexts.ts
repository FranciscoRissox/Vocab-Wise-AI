import { useCallback, useEffect, useState } from "preact/hooks";
import { Languages } from "../../../../shared/types/languages";
import { Difficulty } from "../../../../shared/types/difficulty";
import { Texts } from "../../../texts";
import { randomInt } from "../../../utils";

export const useBaseTexts = () => {
  const [baseTexts, setBaseTexts] = useState<string[]>([]);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [language, setLanguage] = useState(Languages.Español);
  const [difficulty, setDifficulty] = useState(Difficulty.Easy);
  const [currentText, setCurrentText] = useState("");

  const loadTexts = useCallback(async () => {
    const texts = await Texts[language][difficulty]();
    setBaseTexts(texts);
    setUsedIndices([]);
    const index = randomInt(0, texts.length - 1);
    setUsedIndices([index]);
    setCurrentText(texts[index]);
  }, [language, difficulty]);

  useEffect(() => {
    loadTexts();
  }, [loadTexts]);

  const getNextRandomIndex = useCallback(() => {
    if (baseTexts.length === 0) return -1;
    if (usedIndices.length >= baseTexts.length) {
      setUsedIndices([]);
      return randomInt(0, baseTexts.length - 1);
    }

    let index;
    do {
      index = randomInt(0, baseTexts.length - 1);
    } while (usedIndices.includes(index));

    setUsedIndices((prev) => [...prev, index]);
    return index;
  }, [baseTexts, usedIndices]);

  const loadNextText = useCallback(() => {
    const index = getNextRandomIndex();
    if (index === -1) return;
    setCurrentText(baseTexts[index]);
  }, [baseTexts, getNextRandomIndex]);

  return {
    currentText,
    language,
    difficulty,
    setLanguage,
    setDifficulty,
    loadNextText,
    resetTexts: loadTexts,
  };
};
