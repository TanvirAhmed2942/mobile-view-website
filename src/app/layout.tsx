import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/userInfo.authProvide";
import StoreProvider from "@/store/StoreProvider";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PASS IT ALONG",
  description:
    "Your single donation can inspire friends to join, creating a growing wave of support for a cause you care about.",
  icons: {
    icon: "/favicon_white.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-black w-full  sm:w-[420px] mx-auto min-h-[100vh] flex items-center justify-center`}
      >
        <AuthProvider>
          <StoreProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
              {children}
            </NextIntlClientProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
