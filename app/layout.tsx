import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

//TODO: The metadata title should be changed to the current website's title after Unistore:
export const metadata: Metadata = {
  title: "UniStore: Discover Uniqueness, Shop Now!",
  description:
    "Discover unique, high-quality products at UniStore, your go-to destination for exclusive finds and unbeatable variety.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
