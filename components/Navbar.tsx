"use client";

// import Cookies from "js-cookie";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link  from 'next/link';
// import { GrMenu } from "react-icons/gr";
// import { IoMdClose } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
// import { LiaPowerOffSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import { MdModelTraining } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
import { IoMdAppstore } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import Image from 'next/image';


// Define user type
interface User {
  firstName: string;
  lastName: string;
}

function Navbar() {
    const pathname  = usePathname();

    // Hide navbar on these routes
    const hideNavbar = ["/signin", "/signup", "/signup/verify"].includes(pathname);
    const router = useRouter();

    // const [isOpen, setIsOpen] = useState(false);
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    // const [dropdownOpen2, setDropdown2Open] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState(false);
    const [active, setActive] = useState(0);

    const activeClass = "flex px-3 py-2 rounded-lg font-medium bg-opacity-90 transform duration-300 bg-red-500 text-white";
    const inactiveClass = "flex text-black px-3 py-2 rounded-lg hover:bg-gray-300 hover:bg-opacity-25 hover:text-black transform transform ease-out duration-300 hover:scale-95";

    // const navRef = useRef<HTMLDivElement | null>(null);
    // const nav2Ref = useRef<HTMLDivElement | null>(null);
    // const sidebarRef = useRef<HTMLDivElement | null>(null);
    const proRef = useRef<HTMLDivElement | null>(null);

    const Navbar = [
      {name: "Home", route: "/", icon: <IoHomeOutline/>, dis: "translate-x-0"},
      {name: "Training", route: "/training",icon: <MdModelTraining />, dis: "translate-x-16"},
      {name: "Livetv", route: "/livetv", icon: <MdLiveTv />, dis: "translate-x-32"},
      {name: "Store", route: "/store", icon: <IoMdAppstore />, dis: "translate-x-48"},
      {name: "Profile", route: "/profile", icon: <CgProfile />, dis: "translate-x-64"},
    ]

    // Function to handle clicks outside the nav
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const target = event.target as Node;
        // if (navRef.current && !navRef.current.contains(target)) {
        //     setDropdownOpen(false);
        // }
        // if (nav2Ref.current && !nav2Ref.current.contains(target)) { // Fix: Correct ref usage
        //     setDropdown2Open(false);
        // }
        // if (
        //   sidebarRef.current && 
        //   !sidebarRef.current.contains(target) && 
        //   target instanceof Element && // Ensure target is an Element
        //   !target.closest(".toggle-btn") // Now safe to use closest()
        // ) { 
        //   setIsOpen(false); 
        // }
        if (proRef.current && !proRef.current.contains(target)) {
            setProfile(false);
        }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(()=>{
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get("/api/auth/tokenverify", {
            withCredentials: true, // Ensure proper spelling
          });
          setUser(response.data.user);
          setLoggedIn(true);
        } catch (error) {
          console.error("Error verifying user:", error)
          setUser(null);  // Ensure user is null if not logged in
          setLoggedIn(false);
        }
      };

      fetchUserDetails();
    },[loggedIn]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
 
    // const toggleSidebar = () => {
    //   setIsOpen(!isOpen); 
    // }

    const profileToggle = () => {
      setProfile(!profile)
    }

    const logout = async () => {
      try {
        await axios.post("/api/logout", {}, { withCredentials: true });
        setUser(null);   // ✅ Reset user state
        setLoggedIn(false);  // ✅ Reset loggedIn state
        router.push("/signin");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    if (hideNavbar) return null; // Don't render navbar on these pages
    
  return (
    // Navbar
    <div className='relative flex flex-col w-screen'>
      
      {/* Modal */}
     {/* {letsLogin && <Modal isOpen={letsLogin} onClick={() =>setLetsLogin(true) } />}  */}

      {/* Navbar */}
    <div className='flex flex-col w-screen bg-white fixed top-0 z-20 shadow-md' >
    
      <div className='flex justify-between align-middle py-2 pl-2 pr-5 w-screen md:pr-10 md:pl-5 lg:px-10'>
        {/* Toggle */}
        {/* <button className="cursor-pointer px-4 text-2xl align-middle lg:hidden" onClick={toggleSidebar}>
          <GrMenu/>
        </button> */}
        <div className='flex h-auto w-44 self-center'>
         <Image onClick={() => {router.push("/")}} className='cursor-pointer object-contain w-full h-full' width={250} height={150} src="/images/LWFS_LOGO.png" alt="lwfs_logo" />
        </div>

        {/* Navigation Links for Large Screens */}
        <div className="hidden lg:flex items-center space-x-5 text-sm justify-center ">
            <Link href="/"
              className={pathname === "/" ? activeClass : inactiveClass}
              onClick={() => router.push("/")}
            >
              Home
            </Link>

            <Link href="/livetv"
              className={pathname === "/livetv" ? activeClass : inactiveClass}
              onClick={() => router.push("/livetv")}
            >
              Live - TV
            </Link>
            
            <Link href="/training"
              className={pathname === "/training" ? activeClass : inactiveClass}
              onClick={() => router.push("/training")}
            >
              Training
            </Link>

            
            
        </div>
        <div ref={proRef} className='hidden lg:flex'>

        {!loggedIn ? <div className='hidden lg:flex items-center space-x-5 mr-10'>
          <h1 onClick={()=> router.push("/signin")} className='cursor-pointer'>Login/Register</h1>
        </div> : <div className='flex items-center'>
          <h1 className='cursor-pointer text-sm flex items-center gap-1' onClick={profileToggle}>{user?.firstName} {user?.lastName}<FaAngleDown/></h1>
          
          {profile && <>
            <div className='absolute top-[60px] right-5 flex items-center shadow-md  text-red-600 bg-white p-5 z-20  transition translate duration-150'>
              <div className='flex rounded-md text-lw_red items-center gap-2'>
                <AiOutlineLogout className='cursor-pointer' onClick={logout} />
                <button className='cursor-pointer' onClick={logout} >Logout</button>
              </div>
              
            </div>
          </>}
          </div> }
        </div>
        
        

      </div>
    </div>
  

      <div className='flex w-screen h-auto px-2 py-1 fixed shadow-2xl bg-white bottom-0 justify-center z-50 items-center rounded-t-xl md:none'>
        <ul className='flex relative gap-2'>
                {Navbar.map((menu, i)=>(
                  <li key={i} className={`w-16 cursor-pointer py-2 duration-500 ${active === i ? " border border-white border-t-black" : "border-none"}`}>
                    <a className='flex flex-col items-center text-center ' onClick={()=> {
                      setActive(i);
                      router.push(`${menu.route}`)
                      }}>
                      <span className={`text-xl duration-500 ${active === i ? "text-black" : "text-gray-500"}` }>{menu.icon}</span>
                      <span className={`text-xs ${active === i ? "translate-y-0.5 duration-700 text-black" : "text-gray-500" } `}>{menu.name}</span>
                    </a>
                  </li>
                  ))
                }
        </ul>
      </div>
  
</div>


  )
}

export default Navbar