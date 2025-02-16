"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  // Hide navbar on these routes
  const hideNavbar = ["/signin", "/signup", "/signup/verify"].includes(pathname);

  return (
    <html lang="en">
      <body className="bg-white text-black">
      {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
