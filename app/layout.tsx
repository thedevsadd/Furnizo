import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import Initializer from "@/components/shared/Initializer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Furnizo — Premium Minimalist Furniture",
  description: "A premium minimalist furniture e-commerce website showcasing sleek, modern design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-furnizo-beige text-furnizo-muted">
        <Initializer />
        {children}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: "#FAF9F6",
              color: "#2B2420",
              border: "1px solid #EAE6E0",
              fontFamily: "var(--font-manrope), sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
