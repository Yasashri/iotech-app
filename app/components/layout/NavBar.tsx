"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleMobileMenu, closeMobileMenu } from "@/store/slices/uiSlice";
import type { Locale } from "@/store/slices/languageSlice";
import LanguageToggle from "../features/navbar/LanguageToggle";
import ServicesDropdown from "../features/navbar/ServicesDropDown";
import { FiSearch } from "react-icons/fi";

interface NavBarProps {
  locale: Locale;
}

export default function NavBar({ locale }: NavBarProps) {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isMobileMenuOpen = useAppSelector((s) => s.ui.isMobileMenuOpen);

  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Only apply scroll-based transparency on /en home page
  const isHomeEn = pathname === "/en";

  useEffect(() => {
    if (!isHomeEn) return;

    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    onScroll(); // set initial value based on current scroll
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomeEn]);

  const handleSearch = (formData: FormData) => {
    const q = formData.get("q")?.toString() ?? "";
    if (!q.trim()) return;

    router.push(`/${locale}/search?query=${encodeURIComponent(q.trim())}`);
  };

  const handleLinkClick = () => {
    dispatch(closeMobileMenu());
  };

  const focusSearchInput = () => {
    searchInputRef.current?.focus();
  };

  return (
    <header
      className={`sticky top-0 z-50 text-white backdrop-blur transition-colors duration-300 relative
        ${
          isHomeEn
            ? isScrolled
              ? "bg-background-brown border-brown-700"
              : "bg-transparent border-transparent"
            : "bg-background-brown border-brown-700"
        }
      `}
    >
      <div className="flex items-center justify-between max-w-6xl gap-4 px-4 py-3 mx-auto">
        <Link href={`/${locale}`} className="text-lg font-semibold">
          LOGO
        </Link>

        <nav className="items-center hidden gap-6 text-sm md:flex">
          <Link href={`/${locale}`} className="hover:text-brown-400">
            {t("nav.home")}
          </Link>

          <Link href="#" className="hover:text-brown-400">
            {t("nav.aboutUs")}
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
          <form
            action={handleSearch}
            className="relative flex items-center gap-1 group"
          >
            <button
              type="button"
              onClick={focusSearchInput}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:text-brown-400"
              aria-label={t("nav.searchAria") ?? "Search"}
            >
              <FiSearch className="text-lg" />
            </button>

            <input
              ref={searchInputRef}
              name="q"
              placeholder={t("nav.searchPlaceholder")}
              className={`
                px-2 py-1 text-xs md:text-sm border rounded bg-surface border-brown-700
                w-0 opacity-0 pointer-events-none
                transition-all duration-300 ease-out origin-right
                group-hover:w-32 group-hover:opacity-100 group-hover:pointer-events-auto
                group-focus-within:w-40 group-focus-within:opacity-100 group-focus-within:pointer-events-auto
                md:group-hover:w-40 md:group-focus-within:w-52
              `}
            />
          </form>

          <LanguageToggle locale={locale} pathname={pathname} />
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <nav
          className="
            absolute inset-x-0 top-full md:hidden
            border-t border-brown-700
            bg-background-brown/95 backdrop-blur-lg
            z-40
            max-h-[70vh] overflow-y-auto
          "
        >
          <div className="flex flex-col max-w-6xl gap-1 px-4 py-3 mx-auto">
            <Link
              href={`/${locale}`}
              className="px-3 py-2 rounded hover:bg-brown-800"
              onClick={handleLinkClick}
            >
              {t("nav.home")}
            </Link>

            <Link
              href="#"
              className="px-3 py-2 rounded hover:bg-brown-800"
              onClick={handleLinkClick}
            >
              {t("nav.aboutUs")}
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
