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
      <div className='max-w-6xl px-4 py-8 mx-auto space-y-8'>
        {/* Top row: subscription + contacts + social icons */}
        <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-end'>
          {/* Subscription form */}
          <div className='w-full md:max-w-md'>
            <SubscriptionForm locale={locale} />
          </div>

          {/* Contacts + icons */}
          <div className='flex flex-col items-center gap-4 text-sm md:flex-row md:items-center md:justify-end md:gap-6'>
            <span className='text-xs font-semibold tracking-wide text-gray-200 uppercase whitespace-nowrap'>
              {t("footer.contacts")}
            </span>

            <div className='flex items-center justify-center gap-4 md:justify-end'>
              <a
                href='#'
                aria-label='Twitter'
                className='flex items-center justify-center w-10 h-10 text-white transition-colors border border-white rounded-full hover:bg-white hover:text-background-brown'
              >
                <FaTwitter className='w-5 h-5' />
              </a>
              <a
                href='#'
                aria-label='Facebook'
                className='flex items-center justify-center w-10 h-10 text-white transition-colors border border-white rounded-full hover:bg-white hover:text-background-brown'
              >
                <FaFacebookF className='w-5 h-5' />
              </a>
              <a
                href='#'
                aria-label='Google Plus'
                className='flex items-center justify-center w-10 h-10 text-white transition-colors border border-white rounded-full hover:bg-white hover:text-background-brown'
              >
                <FaGooglePlusG className='w-5 h-5' />
              </a>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className='border-t border-brown-500' />

        {/* Bottom row: nav links + copyright */}
        <div className='flex flex-col items-center justify-between gap-4 pt-2 text-sm md:flex-row md:items-center'>
          <nav className='flex flex-wrap justify-center gap-3 text-center rtl:text-right md:justify-start rtl:md:justify-end'>
            <a
              href='#'
              className='px-2 py-1 transition-colors rounded hover:bg-white/10'
            >
              {t("footer.about")}
            </a>
            <a
              href='#'
              className='px-2 py-1 transition-colors rounded hover:bg-white/10'
            >
              {t("footer.ourStrategy")}
            </a>
            <a
              href='#'
              className='px-2 py-1 transition-colors rounded hover:bg-white/10'
            >
              {t("footer.ourAdvantages")}
            </a>
            <a
              href='#'
              className='px-2 py-1 transition-colors rounded hover:bg-white/10'
            >
              {t("footer.socialResponsibility")}
            </a>
            <a
              href='#'
              className='px-2 py-1 transition-colors rounded hover:bg-white/10'
            >
              {t("footer.ourServices")}
            </a>
          </nav>

          <div className='text-xs text-center text-gray-200 md:text-right'>
            © {year}. {t("footer.copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}
