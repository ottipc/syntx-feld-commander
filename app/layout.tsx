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
    <html lang="de" className="bg-syntx-dark text-white">
      <body className="font-mono h-full w-full">{children}</body>
    </html>
  );
}
