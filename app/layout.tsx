import "./globals.css";
import type { Metadata } from "next";
import ReduxProvider from "@/app/components/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "IO-TEC Task",
  description: "Headless CMS frontend"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-white bg-background" suppressHydrationWarning>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
