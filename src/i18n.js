import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    ns: [
      "title",
      "navbar",
      "about",
      "footer",
      "feature",
      "classicplan",
      "siteInfo",
      "faq",
      "aiFeature",
      "buyPage",
      "expandListPlan",
      "trainingPlan",
    ],

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
