import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource-variable/monaspace-radon"; // Monaspace Radon Variable (self-hosted via @fontsource)
import "./style.css";
import AOSInit from "./components/AOSInit";
import ViewTransitions from "./components/ViewTransitions";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: 'Douglas Alvarino',
  description:
    'Douglas Alvarino – Full-stack developer and cybersecurity student building modern, AI-powered tools with Rust, React, and Python.',

  metadataBase: new URL('https://www.dalvarino.net'),

  icons: {
    icon: [
      { url: '/images/favicon.ico' },
      { url: '/images/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/icon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/images/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/images/icon-180x180.png', sizes: '180x180', type: 'image/png' },
      { url: '/images/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icon-256x256.png', sizes: '256x256', type: 'image/png' },
      { url: '/images/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/images/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/images/icon-1024x1024.png', sizes: '1024x1024', type: 'image/png' },
    ],
    apple: '/images/icon-180x180.png',
  },

  manifest: '/images/manifest.json',

  openGraph: {
    title: 'Douglas Alvarino – Developer Portfolio',
    description:
      'Explore my Rust, React, and AI projects. From SwipeToAdopt to Vimurai, see how I build with purpose and precision.',
    url: 'https://www.dalvarino.net/',
    siteName: 'dalvarino.net',
    type: 'website',
    images: [
      {
        url: '/images/preview.png',
        width: 1200,
        height: 630,
        alt: 'Douglas Alvarino Portfolio Preview',
      },
      {
        url: '/images/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Douglas Alvarino',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Douglas Alvarino – Developer Portfolio',
    description:
      'Explore my Rust, React, and AI projects. From SwipeToAdopt to Vimurai, see how I build with purpose and precision.',
    images: ['/images/preview.png'],
    creator: '@douglasalvarino',
  },

  alternates: {
    canonical: '/',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="view-transition" content="same-origin" />
      </head>
      <body className={`${spaceGrotesk.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AOSInit />
        <ViewTransitions />
        {children}
        <Analytics />
        <Script src="/js/background.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
