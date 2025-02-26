import { useEffect } from "react";

export function useGoogleTranslateScript() {
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    // debugger
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "en,es", //here include all languages that you need
        },
        "google_translate_element"
      );
    };
  }, []);
}
