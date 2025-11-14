import { notFound } from "next/navigation";
import type { Locale } from "@/store/slices/languageSlice";

export function assertValidLocale(locale: string): Locale {
  if (locale === "en" || locale === "ar") return locale;
  notFound();
}
