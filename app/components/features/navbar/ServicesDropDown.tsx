"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  toggleServicesDropdown,
  closeServicesDropdown,
  closeMobileMenu,
} from "@/store/slices/uiSlice";
import { cmsFetch } from "@/lib/cmsClient";
import type { Locale } from "@/store/slices/languageSlice";

interface ServiceItem {
  id: number;
  title?: string;
  slug?: string;
}

interface Props {
  locale: Locale;
}

export default function ServicesDropdown({ locale }: Props) {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.ui.isServicesDropdownOpen);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadServices() {
      try {
        const data = await cmsFetch<{ data: ServiceItem[] }>(
          // ask explicitly for title + slug; or remove fields filter entirely
          `/api/services?locale=${locale}&fields[0]=title&fields[1]=slug&pagination[pageSize]=100`
        );
        if (!cancelled) {
          setServices(data.data || []);
          console.log("Services for dropdown:", data.data);
        }
      } catch (e) {
        console.error("Failed to load services:", e);
        if (!cancelled) setServices([]);
      }
    }

    loadServices();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <>
      <div
        className='relative hidden md:block'
        onMouseEnter={() => {
          if (!isOpen) dispatch(toggleServicesDropdown());
        }}
        onMouseLeave={() => {
          dispatch(closeServicesDropdown());
        }}
      >
        <button
          type='button'
          className='text-sm hover:text-brown-400'
        >
          {t("nav.services")}
        </button>

        {isOpen && (
          <div className='absolute left-0 rtl:left-auto rtl:right-0 z-40 w-56 pt-2 bg-background-brown'>
            <div className='text-sm rounded shadow-lg bg-brown-700'>
              <ul className='py-2 overflow-auto max-h-80'>
                {services
                  .filter((s) => !!s?.slug)
                  .map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/${locale}/services/${s!.slug}`}
                        className='block px-3 py-2 hover:bg-brown-600'
                      >
                        {s?.title ?? s?.slug}
                      </Link>
                    </li>
                  ))}

                {services.length === 0 && (
                  <li className='px-3 py-2 text-xs text-gray-200'>
                    No services configured.
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className='md:hidden'>
        <button
          type='button'
          className='w-full text-left rtl:text-right hover:text-brown-400'
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        >
          {t("nav.services")} {isMobileExpanded ? "▲" : "▼"}
        </button>

        {isMobileExpanded && (
          <div className='mt-2 ml-4 rtl:ml-0 rtl:mr-4'>
            <ul className='space-y-1'>
              {services
                .filter((s) => !!s?.slug)
                .map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/${locale}/services/${s!.slug}`}
                      className='block px-3 py-2 rounded hover:bg-brown-800'
                      onClick={() => {
                        setIsMobileExpanded(false);
                        dispatch(closeMobileMenu());
                      }}
                    >
                      {s?.title ?? s?.slug}
                    </Link>
                  </li>
                ))}

              {services.length === 0 && (
                <li className='px-3 py-2 text-xs text-gray-200'>
                  No services configured.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
