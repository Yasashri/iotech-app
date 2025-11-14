import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "@/store";

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
    <html lang="en">
      <body className="text-white bg-background">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
