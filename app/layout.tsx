import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/home/Footer/Footer";
import Navbar from "@/components/home/Navbar/Navbar";
import Sale from "@/components/home/Navbar/Sale";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
      <body className={`${poppins.className} overflow-x-hidden`}>
        <GoogleOAuthProvider clientId="977318153275-d86vkq2krkje5mbi90m887u5cf428kmg.apps.googleusercontent.com">
          <Sale />
          <Navbar />
          {children}
          <Footer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
