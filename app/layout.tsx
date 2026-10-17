import type { Metadata, Viewport } from "next";
import { Manrope, Noto_Sans_Myanmar } from "next/font/google";
import { cookies } from "next/headers";
import { dictionaries } from "../content/dictionaries";
import { LOCALE_COOKIE, parseLocale } from "../lib/locale";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-my",
  display: "swap",
});

/**
 * Runs before first paint so the correct theme is applied with no flash.
 * Deliberately inline (not next/script) — next/script can execute after paint.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("tidy-theme");var d=(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches))?"dark":"light";document.documentElement.setAttribute("data-theme",d);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBFAF7",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = parseLocale((await cookies()).get(LOCALE_COOKIE)?.value);
  const t = dictionaries[locale];

  return {
    title: locale === "my" ? "Tidy Home | ရန်ကုန် အိမ်သန့်ရှင်းရေး" : "Tidy Home | Home cleaning in Yangon",
    description:
      locale === "my"
        ? "ရန်ကုန် အိမ်သန့်ရှင်းရေး။ အထွေထွေသန့်ရှင်းရေး၊ အခြေခံအသစ်ပြင်ဆင်မှုသန့်ရှင်းရေး၊ ရွှေ့ပြောင်းခြင်းနှင့် အဝတ်လျှော်ခြင်း။ Subscription မလိုပါ။"
        : "Home cleaning in Yangon. General cleaning, deep cleaning, moving and laundry. One-time bookings, fixed prices, no subscriptions.",
    keywords: ["cleaning service", "Yangon", "home cleaning", t.brand],
    openGraph: {
      title: t.brand,
      description: t.tagline,
      type: "website",
      locale: locale === "my" ? "my_MM" : "en_US",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = parseLocale((await cookies()).get(LOCALE_COOKIE)?.value);

  return (
    <html
      lang={locale}
      data-locale={locale}
      className={`${manrope.variable} ${notoSansMyanmar.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
