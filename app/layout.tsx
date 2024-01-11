import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Whatsapp Linker',
  description:
    'Con nuestra aplicación de mensajes por WhatsApp, puedes enviar mensajes y contactar a tus clientes de manera rápida y sencilla. ¡Aprovecha esta oportunidad de mejorar tu comunicación!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Toaster />
      <Analytics />
    </html>
  );
}
