"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleSearch, toggleMobileMenu, closeMobileMenu } from "@/store/slices/uiSlice";
import type { Locale } from "@/store/slices/languageSlice";
import LanguageToggle from "../features/navbar/LanguageToggle";
import ServicesDropdown from "../features/navbar/ServicesDropDown";

interface NavBarProps {
  locale: Locale;
}

export default function NavBar({ locale }: NavBarProps) {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isSearchOpen = useAppSelector((s) => s.ui.isSearchOpen);
  const isMobileMenuOpen = useAppSelector((s) => s.ui.isMobileMenuOpen);

  const handleSearch = (formData: FormData) => {
    const q = formData.get("q")?.toString() ?? "";
    if (!q) return;
    router.push(`/${locale}/search?query=${encodeURIComponent(q)}`);
    dispatch(toggleSearch());
  };

  const handleLinkClick = () => {
    dispatch(closeMobileMenu());
  };

  return (
    <header className="sticky top-0 z-50 text-white border-b backdrop-blur border-brown-700 bg-background-brown">
      <div className="flex items-center justify-between max-w-6xl gap-4 px-4 py-3 mx-auto">
        <Link href={`/${locale}`} className="text-lg font-semibold">
          IO-TEC
        </Link>

        <nav className="items-center hidden gap-6 text-sm md:flex">
          <Link href={`/${locale}`} className="hover:text-brown-400">
            {t("nav.home")}
          </Link>

          <ServicesDropdown locale={locale} />

          <Link href={`/${locale}/#team`} className="hover:text-brown-400">
            {t("nav.team")}
          </Link>

          <Link href={`/${locale}/#clients`} className="hover:text-brown-400">
            {t("nav.clients")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="text-xl md:hidden hover:text-brown-400"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>

          {isSearchOpen ? (
            <form action={handleSearch} className="flex items-center gap-2">
              <input
                name="q"
                placeholder={t("nav.searchPlaceholder")}
                className="px-2 py-1 text-xs border rounded bg-surface border-brown-700 md:text-sm"
              />
            </form>
          ) : (
            <button
              onClick={() => dispatch(toggleSearch())}
              className="text-sm hover:text-brown-400"
            >
              🔍
            </button>
          )}

          <LanguageToggle locale={locale} pathname={pathname} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="border-t md:hidden border-brown-700 bg-background-brown">
          <div className="flex flex-col max-w-6xl gap-1 px-4 py-3 mx-auto">
            <Link
              href={`/${locale}`}
              className="px-3 py-2 rounded hover:bg-brown-800"
              onClick={handleLinkClick}
            >
              {t("nav.home")}
            </Link>

            <div className="px-3 py-2">
              <ServicesDropdown locale={locale} />
            </div>

            <Link
              href={`/${locale}/#team`}
              className="px-3 py-2 rounded hover:bg-brown-800"
              onClick={handleLinkClick}
            >
              {t("nav.team")}
            </Link>

            <Link
              href={`/${locale}/#clients`}
              className="px-3 py-2 rounded hover:bg-brown-800"
              onClick={handleLinkClick}
            >
              {t("nav.clients")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
