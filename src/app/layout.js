import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "বাজার দর | নিত্যপণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "প্রয়োজনীয় নিত্যপণ্যের দৈনিক দাম, বাজারভিত্তিক সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এক নজরে দেখুন।",
    
     
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
         <Marquee/>
        {children}
        </body>
          <Footer />
            <ToasterProvider />
    </html>
  );
}
