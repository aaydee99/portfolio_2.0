import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: [
    { path: "./fonts/geist-latin-300-normal.woff2", weight: "300" },
    { path: "./fonts/geist-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/geist-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/geist-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const mono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin-300-normal.woff2", weight: "300" },
    { path: "./fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home — Abdullah Akhtar",
  description: "Abdullah Akhtar: Solutions Architect, frontend and edge engineer in Islamabad, Pakistan.",
};

export const viewport: Viewport = { themeColor: "#09090b", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
