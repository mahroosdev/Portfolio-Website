import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mahroos Mahthie — AI Data Specialist · Front-End Developer · Virtual Assistant",
  description:
    "Portfolio of MFM Mahroos Mahthie — AI-powered data operations, front-end web development, Python automation, and virtual assistance. Builder of NexaFlow, RemoteLink, and the Amir/NexaOS local-first AI project.",
  keywords: [
    "AI Data Specialist",
    "Front-End Developer",
    "Virtual Assistant",
    "Python Automation",
    "Sri Lanka",
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
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
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
