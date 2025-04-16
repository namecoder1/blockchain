import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/block/navbar"
import Footer from "@/components/block/footer"

export const metadata: Metadata = {
  title: "ts.chain",
  description: "ts.chain is a blockchain builded with typescript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <div className="px-2 sm:px-4">
          <Navbar />
        </div>
        <main className="w-full max-w-4xl mx-auto px-4 flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
