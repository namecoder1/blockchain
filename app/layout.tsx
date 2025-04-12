import type { Metadata } from "next";
import "./globals.css";
;

export const metadata: Metadata = {
  title: "blockchain",
  description: "my first blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        {children}
      </body>
    </html>
  );
}
