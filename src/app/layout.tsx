'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if current path starts with /adminlogin
  const isAdminLoginPath = pathname?.startsWith('/adminlogin');

  return (
    <html lang="en">
      <head>
        <title>Global Impact Trust - Changing Lives Together</title>
        <meta
          name="description"
          content="Join our mission to create a better world through compassion and action"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {/* Conditionally render Header */}
          {!isAdminLoginPath && <Header />}
          
          {children}
          
          {/* Conditionally render Footer */}
          {!isAdminLoginPath && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}