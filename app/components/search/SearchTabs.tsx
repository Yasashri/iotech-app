"use client";

import Link from "next/link";
import type { Locale } from "@/store/slices/languageSlice";
import type { SearchTab } from "@/store/slices/searchSlice";

interface Props {
  locale: Locale;
  query: string;
  activeTab: SearchTab;
}

export default function SearchTabs({ locale, query, activeTab }: Props) {
  const base = `/${locale}/search?query=${encodeURIComponent(query)}`;

  return (
    <div className="flex gap-4 mb-4 border-b border-brown-700">
      <Link
        href={`${base}&tab=services`}
        className={`pb-2 text-sm ${
          activeTab === "services"
            ? "border-b-2 border-brown-500 text-brown-300"
            : "text-gray-400"
        }`}
      >
        Services
      </Link>
      <Link
        href={`${base}&tab=teams`}
        className={`pb-2 text-sm ${
          activeTab === "teams"
            ? "border-b-2 border-brown-500 text-brown-300"
            : "text-gray-400"
        }`}
      >
        Teams
      </Link>
    </div>
  );
}
