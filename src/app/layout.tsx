import { ThemeProvider } from '@/context/ThemeContext'; // Adjust the import path as needed
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {/* Wrap your application with ThemeProvider */}
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}