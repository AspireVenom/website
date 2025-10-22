import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import AOSInit from "./components/AOSInit";

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
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Douglas Alvarino",
  description:
    "Douglas Alvarino – Full-stack developer and cybersecurity student building modern, AI-powered tools with Rust, React, and Python.",
  metadataBase: new URL("https://www.dalvarino.net"),
  openGraph: {
    title: "Douglas Alvarino – Developer Portfolio",
    type: "website",
    url: "https://www.dalvarino.net/",
    images: ["/images/preview.png"],
    description:
      "Explore my Rust, React, and AI projects. From SwipeToAdopt to Vimurai, see how I build with purpose and precision.",
    siteName: "dalvarino.net",
  },
  twitter: {
    card: "summary_large_image",
    title: "Douglas Alvarino – Developer Portfolio",
    description:
      "Explore my Rust, React, and AI projects. From SwipeToAdopt to Vimurai, see how I build with purpose and precision.",
    images: ["/images/preview.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AOSInit />
        {children}
        <Script src="/js/background.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
