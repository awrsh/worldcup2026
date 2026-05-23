import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { I18nProvider } from "@/i18n/I18nProvider";
import { LocaleHtmlAttributes } from "@/i18n/LocaleHtmlAttributes";
import { ThemeHtmlAttributes } from "@/components/shared/ThemeHtmlAttributes";
import { iransansX, iransansXNumbers } from "@/lib/fonts/iransans-x";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "World Cup 2026 Predictions",
  description: "Predict scores, earn points, and climb the leaderboard for FIFA World Cup 2026.",
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('wc2026-theme');
    var parsed = stored ? JSON.parse(stored) : null;
    var theme = parsed && parsed.state && parsed.state.theme ? parsed.state.theme : 'dark';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

const localeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('wc2026-locale');
    var parsed = stored ? JSON.parse(stored) : null;
    var locale = parsed && parsed.state && parsed.state.locale ? parsed.state.locale : 'en';
    var html = document.documentElement;
    html.lang = locale === 'fa' ? 'fa' : 'en';
    html.dir = locale === 'fa' ? 'rtl' : 'ltr';
    if (locale === 'fa') html.classList.add('locale-fa');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${iransansX.variable} ${iransansXNumbers.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: localeInitScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <I18nProvider>
          <LocaleHtmlAttributes />
          <ThemeHtmlAttributes />
          {children}
          <Toaster position="top-center" richColors />
        </I18nProvider>
      </body>
    </html>
  );
}
