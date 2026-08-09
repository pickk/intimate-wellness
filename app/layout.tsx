import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const siteUrl = "https://intimate-wellness.example";
const siteDescription =
  "A health-focused publication sharing evidence-based knowledge on sexual wellness, intimacy, and relationships. Educational, tasteful, and human.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IntimateWellness — Sexual Health, Wellness & Relationship Guides",
    template: "%s · IntimateWellness",
  },
  description: siteDescription,
  openGraph: {
    title: "IntimateWellness",
    description: siteDescription,
    url: siteUrl,
    siteName: "IntimateWellness",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IntimateWellness",
    description: siteDescription,
  },
  alternates: {
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
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
      suppressHydrationWarning
      className={`${inter.variable} ${sourceSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
