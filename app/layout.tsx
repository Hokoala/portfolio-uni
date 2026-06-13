import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jean-Michel Le · Portfolio BUT MMI",
  description: "Portfolio universitaire BUT Métiers du Multimédia et de l'Internet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
