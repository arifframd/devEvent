import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub for Dev Event You Shoudln't Miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}>
        <Navbar />
        <div className="z-[-1] absolute inset-0 min-h-screen top-0">
          <LightRays raysOrigin="top-center-offset" raysColor="#5dfeca" raysSpeed={0.5} lightSpread={0.9} rayLength={1.4} followMouse={true} mouseInfluence={0.2} noiseAmount={0.0} distortion={0.01} />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
