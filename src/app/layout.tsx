import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Deepa Kanwaar Mental Health | Consulting Psychologist",
  description:
    "Transformative psychological counseling and guidance to help you heal, grow, and thrive. Individual psychotherapy, couples counseling, and stress management.",
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
