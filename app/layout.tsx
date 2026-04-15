import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSettings } from "@/lib/queries";
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
  const faviconUrl = settings?.favicon?.asset.url;

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {faviconUrl && (
          <>
            <link rel="icon" href={faviconUrl} />
            <link rel="shortcut icon" href={faviconUrl} />
            <link rel="apple-touch-icon" href={faviconUrl} />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
