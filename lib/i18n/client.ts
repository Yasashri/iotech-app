"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "@/locales/en/common.json";
import arCommon from "@/locales/ar/common.json";
import type { Locale } from "@/store/slices/languageSlice";

let initialized = false;

export function initI18n(locale: Locale) {
  if (!initialized) {
    i18n.use(initReactI18next).init({
      resources: {
        en: { common: enCommon },
        ar: { common: arCommon }
      },
      lng: locale,
      fallbackLng: "en",
      ns: ["common"],
      defaultNS: "common",
      interpolation: {
        escapeValue: false
      }
    });

    initialized = true;
  } else {
    i18n.changeLanguage(locale);
  }
  return i18n;
}
