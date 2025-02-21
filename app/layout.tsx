import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

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

  // const pathname = usePathname();

  // Hide navbar on these routes
  // const hideNavbar = ["/signin", "/signup", "/signup/verify"].includes(pathname);

  return (
    <html lang="en">
      <body className="bg-white text-black">
      <Navbar />
        {children}
      </body>
    </html>
  );
}
