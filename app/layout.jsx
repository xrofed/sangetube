import './globals.css';
import Script from 'next/script';
import { siteConfig } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteName = siteConfig.name;

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://example.com'),
  title: {
    default: `${siteName} - Nonton Bokep Indo Video Terbaru`,
    template: `%s | ${siteName}`,
  },
  description: `Watch the best videos on ${siteName}`,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  verification: {
    google: process.env.GOOGLE_VERIF || '',
    yandex: process.env.YANDEX_VERIF || '',
    other: {
      'msvalidate.01': process.env.BING_VIRIF || '',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('theme');var system=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';var theme=saved||system;document.documentElement.setAttribute('data-theme',theme);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body>
        <Script
          src="https://js.wpadmngr.com/static/adManager.js"
          data-admpid="314095"
          strategy="afterInteractive"
        />
        <Header siteName={siteName} />
        <main className="min-h-screen">{children}</main>
        <Footer siteName={siteName} />
      </body>
    </html>
  );
}
