import type { Metadata } from 'next';
import { Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Maron Nodes - Dashboard',
  description: 'Deploy and manage blockchain validator nodes with ease. Support for 40+ networks including Polygon, Avalanche, Ethereum, and more.',
  keywords: ['blockchain', 'nodes', 'validator', 'web3', 'infrastructure', 'deployment'],
  authors: [{ name: 'Maron Nodes' }],
  openGraph: {
    title: 'Maron Nodes - Dashboard',
    description: 'Deploy and manage blockchain validator nodes with ease.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
