import NavBar from "@/app/components/layout/NavBar";
import Footer from "@/app/components/layout/Footer";
import I18nProvider from "@/app/components/providers/I18nProvider";
import type { Locale } from "@/store/slices/languageSlice";
import { notFound } from "next/navigation";

type LayoutParams = Promise<{ locale: string }>;

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: LayoutParams;
}) {
  const { locale } = await params;

  if (locale !== "en" && locale !== "ar") {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <I18nProvider locale={typedLocale}>
      <div className="flex flex-col min-h-screen">
        <NavBar locale={typedLocale} />
        <main className="flex-1">{children}</main>
        <Footer locale={typedLocale} />
      </div>
    </I18nProvider>
  );
}
