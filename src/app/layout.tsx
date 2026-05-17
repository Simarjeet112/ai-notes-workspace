import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'AI Notes - Next Generation Note-Taking with AI',
  description: 'Experience the next-generation operating system for your thoughts. Where AI amplifies your creativity.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  charset: 'utf-8',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
