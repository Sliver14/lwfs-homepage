"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link  from 'next/link';
import { IoHomeOutline } from "react-icons/io5";
import { MdLiveTv } from "react-icons/md";
import { IoMdAppstore } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Image from 'next/image';
import { CircleGauge } from "lucide-react"

const BottomNav = () => {
    const pathname = usePathname();
    const hideNavbar = ["/signin", "/signup", "/signup/verify", "/", "/watch", "/resetpassword", "/reset", "/productdetails", "/cart", "/failed", "/success"].includes(pathname);
    
    const Navbar = [
          {name: "Home", route: "/home", icon: <IoHomeOutline/>,icon2: <IoHomeOutline/> , dis: "translate-x-0"},
          {name: "Training", route: "/training",icon: <CircleGauge />,icon2: <CircleGauge /> , dis: "translate-x-16"},
          {name: "Livetv", route: "/livetv", icon: <MdLiveTv />,icon2: <MdLiveTv /> , dis: "translate-x-32"},
          {name: "Store", route: "/store", icon: <IoMdAppstore />, icon2: <IoMdAppstore />, dis: "translate-x-48"},
          {name: "Profile", route: "/profile", icon: <CgProfile/>, icon2: <Image src="images/profile_outline.svg" alt="" layout="fill" objectFit="cover"  className='w-4 h-4'/> , dis: "translate-x-64"},
        ]

        if (hideNavbar) return null; // Don't render navbar on these pages
  return (
    <div className='flex relative w-screen'>

             {/* Bottom Navbar */}
             <div className='flex w-screen h-auto px-2 py-1 fixed shadow-2xl bg-white bottom-0 justify-center z-50 items-center rounded-t-xl lg:hidden'>
        <ul className='flex relative gap-2'>
                {Navbar.map((menu, i)=>(
                  <li key={i} className={`w-16 cursor-pointer py-2 duration-500 ${pathname === `${menu.route}` ? " border border-white border-t-lwfs_blue" : "border-none"}`}>
                    <Link href={menu.route} className='flex flex-col items-center text-center'>
                      <span className={`text-xl duration-500 ${pathname === `${menu.route}` ? "text-lwfs_blue" : "text-gray-500"}` }>
                        {menu.icon} 
                      </span>
                      <span className={`text-xs ${pathname === `${menu.route}` ? "translate-y-0.5 duration-700 text-lwfs_blue" : "text-gray-500" } `}>{menu.name}
                      </span>
                    </Link>
                  </li>
                  ))
                }
        </ul>
      </div>
    </div>
  )
}

export default BottomNav
