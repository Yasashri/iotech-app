"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/store/slices/languageSlice";
import type { SearchTab } from "@/store/slices/searchSlice";

interface Props {
  locale: Locale;
  query: string;
  tab: SearchTab;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  locale,
  query,
  tab,
  currentPage,
  totalPages
}: Props) {
  const router = useRouter();
  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    const url = `/${locale}/search?query=${encodeURIComponent(
      query
    )}&tab=${tab}&page=${page}`;
    router.push(url);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        disabled={currentPage <= 1}
        onClick={() => goTo(currentPage - 1)}
        className="px-3 py-1 text-xs border rounded border-brown-700 disabled:opacity-40"
      >
        Prev
      </button>
      <span className="text-xs text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => goTo(currentPage + 1)}
        className="px-3 py-1 text-xs border rounded border-brown-700 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
