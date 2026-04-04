import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniTec EAD - Plataforma de Ensino a Distância",
  description:
    "Aprenda com as melhores vídeoaulas do YouTube. Cursos estruturados, progresso rastreado e comunidade engajada.",
  keywords: ["educação", "cursos online", "ead", "youtube", "aprendizado"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="pt-BR"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-slate-950 text-slate-50">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
