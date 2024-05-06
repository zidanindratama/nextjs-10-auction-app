import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProviders from "@/redux/ReduxProvider";
import TanStackProvider from "@/providers/TanStackQueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auction App",
  description: "Made by Zidan Indratama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviders>
          <TanStackProvider>{children}</TanStackProvider>
          <Toaster />
        </ReduxProviders>
      </body>
    </html>
  );
}
