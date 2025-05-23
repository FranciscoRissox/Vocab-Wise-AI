import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en/translation.json";
import es from "./es/translation.json";
import pt from "./pt/translation.json";

i18n
  .use(LanguageDetector) // detecta el idioma del navegador
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "es", "pt"],
    load: "languageOnly",
    resources: {
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt },
    },
    interpolation: {
      escapeValue: false, // React ya hace escape
    },
  });

export default i18n;
