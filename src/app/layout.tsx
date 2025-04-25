import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SITE_CONFIG } from '@/utils/constants';
import Layout from '@/components/layout/Layout';
import '@/styles/global.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme={SITE_CONFIG.defaultTheme}
          enableSystem
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
