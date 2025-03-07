"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// import { IoHomeOutline } from "react-icons/io5";
// import { MdLiveTv } from "react-icons/md";
// import { IoMdAppstore } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";
import { HomeIcon, TvIcon, ArchiveBoxIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';

const BottomNav = () => {
    const pathname = usePathname();
    
    const hideNavbar = [
        "/signin", "/signup", "/signup/verify", "/", 
        "/watch", "/resetpassword", "/reset", "/productdetails", 
        "/cart", "/failed", "/success", "/profile"
    ].includes(pathname);
    
    const Navbar = [
        { name: "Home", route: "/home", icon: <HomeIcon className="h-6 w-6"/>, dis: "translate-x-0" },
        { name: "Livetv", route: "/livetv", icon: <TvIcon className="h-6 w-6"/>, dis: "translate-x-[91px]" },
        { name: "Store", route: "/store", icon: <ArchiveBoxIcon className="h-6 w-6"/>, dis: "translate-x-[183px]" },
        { 
            name: "Profile", 
            route: "/profile", 
            icon: <UserCircleIcon className="h-6 w-6"/>, 
            icon2: (
                <div className="relative w-4 h-4">
                    <Image src="/images/profile_outline.svg" alt="Profile" fill style={{ objectFit: "cover" }} />
                </div>
            ), 
            dis: "translate-x-[274px]" 
        }
    ];
    
    const activeNav = Navbar.find(menu => menu.route === pathname);

    if (hideNavbar) return null;

    return (
        <div className='flex relative w-screen shadow-md rounded-tr-lg'>
            {/* Bottom Navbar */}
            <div className='flex w-screen h-auto px-2 py-1 fixed shadow-2xl bg-white bottom-0 justify-center z-50 items-center rounded-t-xl lg:hidden'>
                <ul className='flex relative gap-7'>
                    {/* Active Indicator */}
                    <span className={`bg-lwfs_blue duration-500 h-[67px] w-[67px] shadow-sm ${activeNav ? activeNav.dis : ""} absolute rounded-full border-4 border-white -top-3.5`}></span>

                    {Navbar.map((menu, i) => (
                        <li key={i} className={`w-16 cursor-pointer py-2 duration-700 z-50 ${pathname === menu.route ? "-mt-3" : "border-none"}`}>
                            <Link href={menu.route} className='flex flex-col items-center text-center'>
                                <span className={`text-2xl duration-500 ${pathname === menu.route ? "text-white" : "text-gray-800"}`}>
                                    {menu.icon}
                                </span>
                                <span className={`text-xs ${pathname === menu.route ? "translate-y-0.5 duration-700 text-white" : "text-gray-800"}`}>
                                    {menu.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BottomNav;
