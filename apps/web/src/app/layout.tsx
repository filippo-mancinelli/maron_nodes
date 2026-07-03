import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maron Nodes - Deploy Blockchain Nodes in Seconds',
  description: 'Deploy and manage blockchain validator nodes with ease. Support for 40+ networks including Polygon, Avalanche, Ethereum, and more.',
  keywords: ['blockchain', 'nodes', 'validator', 'web3', 'infrastructure', 'deployment'],
  authors: [{ name: 'Maron Nodes' }],
  openGraph: {
    title: 'Maron Nodes - Deploy Blockchain Nodes in Seconds',
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
