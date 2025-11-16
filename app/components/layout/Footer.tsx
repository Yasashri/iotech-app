"use client";

import { useTranslation } from "react-i18next";
import { FaTwitter, FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import SubscriptionForm from "./SubscriptionForm";
import type { Locale } from "@/store/slices/languageSlice";

export default function Footer({ locale }: { locale: Locale }) {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <footer className='mt-10 text-white bg-background-brown'>
      <div className='max-w-6xl px-4 py-8 mx-auto'>
        {/* Top row: subscription + contacts + social icons */}
        <div className='flex flex-col gap-6 md:flex-row md:justify-end md:items-end'>
          {/* Subscription form */}
          <div className='w-full md:max-w-md'>
            <SubscriptionForm locale={locale} />
          </div>

          {/* Contacts + icons */}
          <div className='flex flex-col items-start gap-3 text-sm rtl:items-end sm:flex-row sm:items-center'>
            <span className='whitespace-nowrap'>{t("footer.contacts")}</span>
            <div className='flex items-center gap-3 text-xs'>
              <a
                href='#'
                aria-label='Twitter'
                className='flex items-center justify-center w-8 h-8 text-white transition-colors border border-white rounded-full hover:bg-white hover:text-background-brown'
              >
                <FaTwitter className='w-4 h-4' />
              </a>
              <a
                href='#'
                aria-label='Facebook'
                className='flex items-center justify-center w-8 h-8 text-white transition-colors border border-white rounded-full hover:bg-white hover:text-background-brown'
              >
                <FaFacebookF className='w-4 h-4' />
              </a>
              <a
                href='#'
                aria-label='Google Plus'
                className='flex items-center justify-center w-8 h-8 text-white transition-colors border border-white rounded-full hover:bg-white hover:text-background-brown'
              >
                <FaGooglePlusG className='w-4 h-4' />
              </a>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className='mt-6 border-t border-brown-500' />

        {/* Bottom row: nav links (left) + copyright (right) */}
        <div className='flex flex-col items-start justify-between gap-4 pt-4 text-sm rtl:items-end md:flex-row md:items-center'>
          <nav className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6 rtl:text-right'>
            <a href='#' className='hover:text-gray-200'>
              {t("footer.about")}
            </a>
            <a href='#' className='hover:text-gray-200'>
              {t("footer.ourStrategy")}
            </a>
            <a href='#' className='hover:text-gray-200'>
              {t("footer.ourAdvantages")}
            </a>
            <a href='#' className='hover:text-gray-200'>
              {t("footer.socialResponsibility")}
            </a>
            <a href='#' className='hover:text-gray-200'>
              {t("footer.ourServices")}
            </a>
          </nav>

          <div className='text-gray-200'>
            © {year}. {t("footer.copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}
