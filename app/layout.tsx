import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SYNTX FELD-COMMANDER",
  description: "Echtzeit-Visualisierung der SYNTX-Felder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      {/* Farbe und Hintergrund auf Body verschoben, um korrekte Vererbung zu gewährleisten */}
      <body className="font-mono bg-syntx-dark text-white" suppressHydrationWarning>{children}</body>
    </html>
  );
}
