// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Help Desk Ticketing System";
const description =
  "The help desk ticketing system includes ticket submission and review features.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://ag-help-desk.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
