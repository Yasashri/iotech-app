"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleServicesDropdown } from "@/store/slices/uiSlice";
import { cmsFetch } from "@/lib/cmsClient";
import type { Locale } from "@/store/slices/languageSlice";

interface ServiceItem {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

interface Props {
  locale: Locale;
}

export default function ServicesDropdown({ locale }: Props) {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.ui.isServicesDropdownOpen);
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await cmsFetch<{ data: ServiceItem[] }>(
          `/api/services?locale=${locale}`
        );
        setServices(data.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [locale]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => dispatch(toggleServicesDropdown())}
        className="text-sm hover:text-brown-400"
      >
        {t("nav.services")}
      </button>
      {isOpen && (
        <div className="absolute left-0 z-40 w-56 mt-2 text-sm rounded shadow-lg bg-brown-700">
          <ul className="py-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/${locale}/services/${s.attributes.slug}`}
                  className="block px-3 py-2 hover:bg-brown-600"
                >
                  {s.attributes.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
