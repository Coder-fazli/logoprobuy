import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSettings } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import "./globals.css";

export const dynamic = 'force-dynamic';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LogoBuyPro",
  description: "Own the logo. Own the brand.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const faviconUrl = settings?.favicon
    ? urlFor(settings.favicon).width(192).height(192).fit('crop').url()
    : '/favicon.png';

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {faviconUrl && (
          <>
            <link rel="icon" href={faviconUrl} sizes="any" type="image/png" />
            <link rel="icon" href={faviconUrl} sizes="192x192" type="image/png" />
            <link rel="apple-touch-icon" href={faviconUrl} sizes="180x180" />
            <link rel="shortcut icon" href={faviconUrl} />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
