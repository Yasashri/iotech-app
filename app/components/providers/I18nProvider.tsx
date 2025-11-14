"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { initI18n } from "@/lib/i18n";
import { useAppDispatch } from "@/hooks/redux";
import { setLocale, Locale } from "@/store/slices/languageSlice";

export default function I18nProvider({
  children,
  locale
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const i18n = initI18n(locale);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocale(locale));
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }
  }, [locale, dispatch]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
