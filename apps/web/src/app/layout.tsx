import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maron Nodes — Your Validator Node, Live in Minutes',
  description:
    'Maron Nodes provisions the server, configures the client, and monitors your validator node. Terraform and Ansible under the hood, one click for you. Ethereum, Solana, and Polkadot on Hetzner or Contabo.',
  keywords: ['blockchain', 'validator node', 'ethereum', 'solana', 'polkadot', 'web3', 'infrastructure', 'deployment', 'terraform', 'ansible'],
  authors: [{ name: 'Maron Nodes' }],
  openGraph: {
    title: 'Maron Nodes — Your Validator Node, Live in Minutes',
    description:
      'Deploy and monitor blockchain validator nodes with one click. Your server, your keys, our automation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
