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
  verification: {
    google: "vKHZJ8Cx1qFH-w6dte-9TE-3BTx_D7Lf-mkEt-9Tsx8",
  },
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
      <body className="min-h-full flex flex-col">
        {children}
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/108599373" style={{ position: 'absolute', left: -9999 }} alt="" />
          </div>
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=108599373','ym');
          ym(108599373,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
        `}} />
      </body>
    </html>
  );
}
