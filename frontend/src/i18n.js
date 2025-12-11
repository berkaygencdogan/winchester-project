import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./languages/en.json";
import tr from "./languages/tr.json";
import de from "./languages/de.json";
import fr from "./languages/fr.json";
import es from "./languages/es.json";
import ar from "./languages/ar.json";
import ru from "./languages/ru.json";
import pt from "./languages/pt.json";
import it from "./languages/it.json";
import ja from "./languages/ja.json";
import zh from "./languages/zh.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
      de: { translation: de },
      fr: { translation: fr },
      es: { translation: es },
      ar: { translation: ar },
      ru: { translation: ru },
      pt: { translation: pt },
      it: { translation: it },
      ja: { translation: ja },
      zh: { translation: zh },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
