import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tervlon — a day on a good team, observed",
  description:
    "A living sprint simulation: join a software team mid-sprint, write real code, get pulled into a standup, and walk away with an evidence-backed scorecard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
