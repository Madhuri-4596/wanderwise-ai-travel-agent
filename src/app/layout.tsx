import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUNO Travel Agent - Your Best Trip Budget Bot",
  description: "Smart AI-powered travel assistant helping you find the best flights, hotels, and rides at budget-friendly prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Travelpayouts Tracking Script */}
        <Script
          id="travelpayouts-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w, d, s, marker_id) {
                w.TravelpayoutsMarker = marker_id;
                var script = d.createElement(s);
                script.async = true;
                script.src = '//c82.travelpayouts.com/content?marker=' + marker_id + '&trs=' + encodeURIComponent(d.referrer) + '&site_id=' + encodeURIComponent(d.location.hostname);
                d.head.appendChild(script);
              })(window, document, 'script', '681881');
            `,
          }}
        />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
