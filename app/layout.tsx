import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import BottomNav from "@/components/BottomNav"
import { UserProvider } from "./context/UserContext";
import { UserCartProvider } from "./context/UserCartContext";

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
            <Navbar />
              {children}
            <BottomNav />
          </UserCartProvider>
          
        </UserProvider>
        
      </body>
    </html>
  );
}
