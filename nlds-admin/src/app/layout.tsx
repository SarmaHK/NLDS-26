import type { Metadata, Viewport } from "next";
import { Poppins, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NLDS'26 Mission Control | Admin Panel",
  description:
    "National Leadership Development Seminar 2026. Your next mission begins here. 09–11 October 2026, Sri Lanka.",
  openGraph: {
    title: "NLDS'26 — Mission Impossible",
    description:
      "The mission is impossible. The impossible is yours to define. NLDS 2026 by AIESEC in Sri Lanka.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NLDS'26 — Mission Impossible",
    description: "Your next mission begins here. NLDS 2026 by AIESEC in Sri Lanka.",
  },
  icons: {
    icon: "/images/Logos/NLDS LOGO.png",
    shortcut: "/images/Logos/NLDS LOGO.png",
    apple: "/images/Logos/NLDS LOGO.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased" style={{ overflowX: "hidden", maxWidth: "100vw" }}>
        <main className="min-h-screen bg-bg text-text-main">
          {children}
        </main>
      </body>
    </html>
  );
}
