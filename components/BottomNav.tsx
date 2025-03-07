// "use client";
// import React from 'react';
// import { usePathname } from 'next/navigation';
// import Link  from 'next/link';
// import { IoHomeOutline } from "react-icons/io5";
// import { MdLiveTv } from "react-icons/md";
// import { IoMdAppstore } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";
// import Image from 'next/image';
// import { CircleGauge } from "lucide-react"

// const BottomNav = () => {
//     const pathname = usePathname();
//     const hideNavbar = ["/signin", "/signup", "/signup/verify", "/", "/watch", "/resetpassword", "/reset", "/productdetails", "/cart", "/failed", "/success"].includes(pathname);
    
//     const Navbar = [
//           {name: "Home", route: "/home", icon: <IoHomeOutline/>,icon2: <IoHomeOutline/> , dis: "translate-x-0"},
//           // {name: "Training", route: "/training",icon: <CircleGauge />,icon2: <CircleGauge /> , dis: "translate-x-16"},
//           {name: "Livetv", route: "/livetv", icon: <MdLiveTv />,icon2: <MdLiveTv /> , dis: "translate-x-32"},
//           {name: "Store", route: "/store", icon: <IoMdAppstore />, icon2: <IoMdAppstore />, dis: "translate-x-48"},
//           {name: "Profile", route: "/profile", icon: <CgProfile/>, icon2: <Image src="images/profile_outline.svg" alt="" layout="fill" objectFit="cover"  className='w-4 h-4'/> , dis: "translate-x-64"},
//         ]

//         if (hideNavbar) return null; // Don't render navbar on these pages
//   return (
//     <div className='flex relative w-screen'>

//              {/* Bottom Navbar */}
//              <div className='flex w-screen h-auto px-2 py-1 fixed shadow-2xl bg-white bottom-0 justify-center z-50 items-center rounded-t-xl lg:hidden'>
//         <ul className='flex relative gap-2'>
//           <span className={`bg-rose-600  h-16 w-16 ${Navbar[pathname === Navbar.route].dis} absolute rounded-full border-4 border-white -top-5`}></span>
//                 {Navbar.map((menu, i)=>(
//                   <li key={i} className={`w-16 cursor-pointer py-2 duration-700 z-50 ${pathname === `${menu.route}` ? " -mt-5" : "border-none"}`}>
//                     <Link href={menu.route} className='flex flex-col items-center text-center'>
//                       <span className={`text-xl duration-500 ${pathname === `${menu.route}` ? "text-white" : "text-gray-500"}` }>
//                         {menu.icon} 
//                       </span>
//                       <span className={`text-xs ${pathname === `${menu.route}` ? "translate-y-0.5 duration-700 text-white" : "text-gray-500" } `}>{menu.name}
//                       </span>
//                     </Link>
//                   </li>
//                   ))
//                 }
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default BottomNav


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
        "/cart", "/failed", "/success"
    ].includes(pathname);
    
    const Navbar = [
        { name: "Home", route: "/home", icon: <HomeIcon className="h-6 w-6"/>, dis: "translate-x-0" },
        { name: "Livetv", route: "/livetv", icon: <TvIcon className="h-6 w-6"/>, dis: "translate-x-[80px]" },
        { name: "Store", route: "/store", icon: <ArchiveBoxIcon className="h-6 w-6"/>, dis: "translate-x-[160px]" },
        { 
            name: "Profile", 
            route: "/profile", 
            icon: <UserCircleIcon className="h-6 w-6"/>, 
            icon2: (
                <div className="relative w-4 h-4">
                    <Image src="/images/profile_outline.svg" alt="Profile" fill style={{ objectFit: "cover" }} />
                </div>
            ), 
            dis: "translate-x-[240px]" 
        }
    ];
    
    const activeNav = Navbar.find(menu => menu.route === pathname);

    if (hideNavbar) return null;

    return (
        <div className='flex relative w-screen shadow-md rounded-tr-lg'>
            {/* Bottom Navbar */}
            <div className='flex w-screen h-auto px-2 py-1 fixed shadow-2xl bg-white bottom-0 justify-center z-50 items-center rounded-t-xl lg:hidden'>
                <ul className='flex relative gap-4'>
                    {/* Active Indicator */}
                    <span className={`bg-lwfs_blue duration-500 h-16 w-16 shadow-md ${activeNav ? activeNav.dis : ""} absolute rounded-full border-4 border-white -top-3.5`}></span>

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
