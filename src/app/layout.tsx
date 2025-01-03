import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google'
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from '@/providers/auth'
import { ModalProvider } from "@/providers/modal";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "./loading";

const opensans = Open_Sans({
  display: 'swap',
  fallback: ['sans-serif'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "AdvControl",
  description: "Sistema de gerenciamento de demandas jurídicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={opensans.className}
      >
        <AuthProvider>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />

          <ModalProvider>
            <Header/>
            <Suspense fallback={<Loading/>}>
              {children}
            </Suspense>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
