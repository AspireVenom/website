import type { Metadata } from 'next';
import './globals.css';
import 'aos/dist/aos.css';
import InitClient from '../components/InitClient';

export const metadata: Metadata = {
  title: 'Douglas Alvarino',
  description:
    'Douglas Alvarino – Full-stack developer and cybersecurity student building modern, AI-powered tools with Rust, React, and Python.',
  metadataBase: new URL('https://www.dalvarino.net/'),
  openGraph: {
    title: 'Douglas Alvarino – Developer Portfolio',
    type: 'website',
    url: 'https://www.dalvarino.net/',
    images: ['/images/preview.png'],
    description:
      'Explore my Rust, React, and AI projects. From SwipeToAdopt to Vimurai, see how I build with purpose and precision.',
    siteName: 'dalvarino.net',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Douglas Alvarino – Developer Portfolio',
    description:
      'Explore my Rust, React, and AI projects. From SwipeToAdopt to Vimurai, see how I build with purpose and precision.',
    images: ['/images/preview.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="32x32" />
        <link rel="canonical" href="https://www.dalvarino.net/" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <InitClient />
      </body>
    </html>
  );
}


