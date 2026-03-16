import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  verification: {
    google: 'vsumFg2f7U5kN7XVAxvmXabt-ERbZYcY2nth1whemdY',
  },
  title: 'Easy Free Pay Stub Generator — Create Professional Pay Stubs in Minutes',
  description: 'Generate a professional pay stub instantly. Enter your info, preview for free, download for $5. Perfect for contractors, freelancers, and small businesses.',
  keywords: 'free pay stub generator, paystub maker, check stub generator, pay stub online, free paystub, contractor pay stub, freelancer pay stub',
  openGraph: {
    title: 'Easy Free Pay Stub Generator',
    description: 'Create professional pay stubs in under 2 minutes. Free preview. $5 to download.',
    url: 'https://easyfreepaystubgenerator.com',
    siteName: 'EasyFreePayStubGenerator.com',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18018950552"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18018950552');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
