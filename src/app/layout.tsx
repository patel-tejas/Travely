import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://travelyai.vercel.app"),
  title: "Travely AI - Personal Travel Planner",
  description: "Intelligent daily itineraries and curated accommodations powered by AI. Plan your next adventure effortlessly with Travely AI.",
  keywords: ["AI travel planner", "intelligent itineraries", "personalized travel", "trip organizer", "Travely AI", "travel automation"],
  authors: [{ name: "Travely AI Team" }],
  openGraph: {
    title: "Travely AI - Personal Travel Planner",
    description: "Intelligent daily itineraries and curated accommodations powered by AI.",
    url: "https://travelyai.vercel.app",
    siteName: "Travely AI",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travely AI - Personal Travel Planner",
    description: "Intelligent daily itineraries and curated accommodations powered by AI.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.className}>
        <Toaster />
        <Header />
        <BottomNav />
        
        <main className="flex-1 pt-20 pb-24 sm:pb-0">
          {children}
        </main>

        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
