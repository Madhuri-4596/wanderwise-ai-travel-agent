import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WanderWise - AI-Powered Trip Planning",
  description: "Wander smart, travel wise. Get personalized itineraries, flight and hotel recommendations, and expert travel tips powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
