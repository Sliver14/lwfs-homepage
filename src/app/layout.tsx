import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { UserProvider } from "../context/UserContext";
import { UserCartProvider } from "../context/UserCartContext";
import { PaymentProvider } from "../context/PaymentContext";
import { SocketProvider } from '@/context/SocketContext';
// import { Figtree } from "next/font/google";

// const figtree = Figtree({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LWFS - Living Word Foundation School",
  description: "Living Word Foundation School - Empowering lives through education and faith",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <SocketProvider>
          <UserProvider>
            <UserCartProvider>
              <PaymentProvider>
                <Navbar />
                <main className="lg:ml-64 min-h-screen">
                  {children}
                </main>
              </PaymentProvider>
            </UserCartProvider>
          </UserProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
