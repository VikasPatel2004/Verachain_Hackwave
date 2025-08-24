import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '../components/ui/toaster';
import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'VeraChain',
  description: 'A data-driven risk score for land transportation.',
};

import { AuthProvider } from '../hooks/auth-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
