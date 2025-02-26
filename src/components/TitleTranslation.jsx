// src/App.js
import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

function TitleTranslation() {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t("test-title", { ns: "title" })}</h1>
      <h1>{t("welcome-message", { ns: "title" })}</h1>
      {/* This will render the translation for 'welcome' */}
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("my")}>Myanmar</button>
    </div>
  );
}

export default TitleTranslation;
