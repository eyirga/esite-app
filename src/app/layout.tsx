import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "./globals.css";
//import { ClerkProvider } from "@clerk/nextjs";
//import Navbar from "@/components/zoom/Navbar";
import Footer from '@/components/home/Footer'
//import ClientProvider from "./(root)/zoom/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meeting App",
  description: "A video calling app built with Next.js & Stream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body className={`${inter.className} bg-dark-2`}>
    
            
            <main className="px-3 py-6 ">
              {children}
            </main>
            <Footer />
    
        </body>
      </html>
    
  );
}
