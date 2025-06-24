import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'ResumeRender',
  description: 'Create and preview beautiful resume templates, rendered live in your browser.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Lora:ital,wght@0,400;0,700;1,400&family=Source+Code+Pro:wght@400;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  );
}
