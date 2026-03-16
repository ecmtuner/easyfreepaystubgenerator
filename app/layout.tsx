import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
