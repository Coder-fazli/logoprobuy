import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSettings } from "@/lib/queries";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const faviconUrl = settings?.favicon?.asset.url;

  return {
    title: "LogoBuyPro",
    description: "Own the logo. Own the brand.",
    ...(faviconUrl && {
      icons: {
        icon: faviconUrl,
        shortcut: faviconUrl,
        apple: faviconUrl,
      },
    }),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
