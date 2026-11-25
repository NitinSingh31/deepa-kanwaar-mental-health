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
  metadataBase: new URL("https://psychologistdeepa.com"),
  title: "Deepa Kanwaar | Counselling Psychologist & Allied Health Provider",
  description:
    "Transformative online psychological counseling and psychotherapy with 20+ years of clinical practice. Evidence-based care for anxiety, depression, couple therapy, and emotional healing worldwide.",
  keywords: [
    "Deepa Kanwaar",
    "Psychologist Deepa",
    "Deepa Kanwaar Psychologist",
    "Counselling Psychologist Deepa",
    "Deepa Kanwaar Mental Health",
    "Online Psychologist India",
    "Online Therapy Google Meet",
    "Psychotherapy online",
    "Couple Counselling online",
    "De-addiction counselling",
    "Sexual abuse counselling",
    "counselordeepa"
  ],
  authors: [{ name: "Deepa Kanwaar" }],
  creator: "Deepa Kanwaar",
  publisher: "Deepa Kanwaar Mental Health",
  openGraph: {
    title: "Deepa Kanwaar | Counselling Psychologist & Allied Health Provider",
    description:
      "Transformative online psychological counseling and guidance with 20+ years clinical practice.",
    url: "https://psychologistdeepa.com",
    siteName: "Deepa Kanwaar Mental Health",
    images: [
      {
        url: "/images/deepa-portrait.jpg",
        width: 800,
        height: 800,
        alt: "Deepa Kanwaar - Counselling Psychologist",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepa Kanwaar | Counselling Psychologist",
    description: "20+ Years Clinical Practice • Purely Online Therapy Worldwide",
    images: ["/images/deepa-portrait.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/logo-icon.png" },
      { url: "/icon.png" },
    ],
    shortcut: "/images/logo-icon.png",
    apple: "/images/logo-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Deepa Kanwaar",
  "alternateName": ["Psychologist Deepa", "Deepa Kanwaar Mental Health", "counselordeepa"],
  "url": "https://psychologistdeepa.com",
  "logo": "https://psychologistdeepa.com/images/logo-icon.png",
  "image": "https://psychologistdeepa.com/images/deepa-portrait.jpg",
  "description": "Counselling Psychologist & Allied Health Provider with 20+ years clinical experience. Providing psychotherapy, relaxation techniques, group therapy, individual and couple counselling, de-addiction counselling, and sexual abuse counselling online worldwide.",
  "medicalSpecialty": ["Psychotherapy", "ClinicalPsychology"],
  "telephone": "+919877408869",
  "priceRange": "₹₹",
  "sameAs": [
    "https://www.instagram.com/counselordeepa"
  ],
  "availableService": [
    { "@type": "MedicalTherapy", "name": "Psychotherapy" },
    { "@type": "MedicalTherapy", "name": "Relaxation Techniques" },
    { "@type": "MedicalTherapy", "name": "Group Therapy" },
    { "@type": "MedicalTherapy", "name": "Individual and Couple Counselling" },
    { "@type": "MedicalTherapy", "name": "De-addiction Counselling" },
    { "@type": "MedicalTherapy", "name": "Sexual Abuse Counselling" }
  ]
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-linen-50 text-sage-900 flex flex-col font-sans selection:bg-sage-200 selection:text-sage-900">
        {children}
      </body>
    </html>
  );
}
