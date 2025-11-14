"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/store/slices/languageSlice";

interface Props {
  locale: Locale;
  pathname: string | null;
}

export default function LanguageToggle({ locale, pathname }: Props) {
  const router = useRouter();

  const switchLocale = (target: Locale) => {
    if (!pathname) {
      router.push(`/${target}`);
      return;
    }
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${target}`);
      return;
    }
    segments[0] = target;
    router.push("/" + segments.join("/"));
  };

  return (
    <div className="flex items-center gap-1 px-2 py-1 text-xs border rounded border-brown-700">
      <button
        className={locale === "en" ? "font-bold text-brown-400" : ""}
        onClick={() => switchLocale("en")}
      >
        EN
      </button>
      <span className="text-gray-500">|</span>
      <button
        className={locale === "ar" ? "font-bold text-brown-400" : ""}
        onClick={() => switchLocale("ar")}
      >
        AR
      </button>
    </div>
  );
}
