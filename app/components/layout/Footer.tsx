"use client";

import { useTranslation } from "react-i18next";
import SubscriptionForm from "./SubscriptionForm";
import type { Locale } from "@/store/slices/languageSlice";

export default function Footer({ locale }: { locale: Locale }) {
  const { t } = useTranslation("common");

  return (
    <footer className="mt-10 border-t border-brown-700 bg-surface">
      <div className="grid max-w-6xl gap-6 px-4 py-8 mx-auto md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-lg font-semibold">
            {t("footer.subscribe")}
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            {/* Add more translated copy if needed */}
          </p>
          <SubscriptionForm locale={locale} />
        </div>
        <div className="flex flex-col gap-2 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} IO-TEC</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
