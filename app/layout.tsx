import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import BottomNav from "@/components/BottomNav"
import { UserProvider } from "./context/UserContext";
import { UserCartProvider } from "./context/UserCartContext";
import { PaymentProvider } from "./context/PaymentContext";
// import { Figtree } from "next/font/google";

// const figtree = Figtree({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lwfoundationschool", // Change this to your site title
  description: "Welcome to Loveworld Foundation School",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <UserProvider>
          <UserCartProvider>
            <PaymentProvider>
              <Navbar />
                {children}
              {/* <BottomNav /> */}
            </PaymentProvider>
            
          </UserCartProvider>
          
        </UserProvider>
        
      </body>
    </html>
  );
}
