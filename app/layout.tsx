import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mahroos Mahthie — Junior Software Engineer · AI-Assisted Developer",
  description:
    "Portfolio of MFM Mahroos Mahthie — Junior Software Engineer and AI-assisted developer. Builder of NexaFlow, RemoteLink, responsive web apps, and local-first applications.",
  keywords: [
    "Junior Software Engineer",
    "Full-Stack Developer",
    "AI-Assisted Developer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Mahroos Mahthie",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="grain min-h-svh">
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap"
        />
        {children}
      </body>
    </html>
  );
}
