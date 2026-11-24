import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Deepa Kanwaar Mental Health | Counselling Psychologist & Allied Health Provider",
  description:
    "Transformative online psychological counseling and guidance. Psychotherapy, relaxation techniques, group therapy, couple counselling, and de-addiction support with 20+ years clinical experience.",
  icons: {
    icon: "/images/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-linen-50 text-sage-900 flex flex-col font-sans selection:bg-sage-200 selection:text-sage-900">
        {children}
      </body>
    </html>
  );
}
