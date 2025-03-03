"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link  from 'next/link';
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import axios from 'axios';
// import Image from 'next/image';
import { ShoppingCart } from "lucide-react";
import { useUserCart } from '@/app/context/UserCartContext';

// Define user type
interface User {
  firstName: string;
  lastName: string;
}

function Navbar() {
    const pathname  = usePathname();

    // Hide navbar on these routes
    const hideNavbar = ["/signin", "/signup", "/signup/verify", "/", "/watch", "/resetpassword", "/reset", "/cart", "/productdetails"].includes(pathname);
    const router = useRouter();

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState(false);
    // const [active, setActive] = useState(0);
    const { cart } = useUserCart();

    const activeClass = "flex px-3 py-2 rounded-lg font-medium bg-opacity-90 transform duration-300 bg-red-500 text-white";
    const inactiveClass = "flex text-black px-3 py-2 rounded-lg hover:bg-gray-300 hover:bg-opacity-25 hover:text-black transform transform ease-out duration-300 hover:scale-95";

    const proRef = useRef<HTMLDivElement | null>(null);

    // Function to handle clicks outside the nav
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const target = event.target as Node;
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
    <div className='flex flex-col w-screen fixed top-0 z-20 shadow-md ' >
      {pathname === "/store" ? 
      <div className='flex p3 bg-white px-8 h-14 w-full items-center'>
        <div className='flex'></div>

        <div className='flex mx-auto font-bold text-lwfs_blue text-center'>
          PRODUCT STORE
        </div>

        <div onClick={()=> router.push("/cart")} className='flex h-auto justify-end relative items-center cursor-pointer'>
          <div className='flex relative'>
            <ShoppingCart className='text-lwfs_blue text-2xl '/>
            <div className='w-5 h-5 rounded-full bg-black absolute items-center text-center text-sm justify-center text-white -top-2 -right-2'>{cart?.cartItems?.length || 0}</div>
          </div>  
        </div>
      </div>
      : 
        <div className='flex flex-col bg-white p3 h-14 justify-center items-center'>
        {/* <Image
          src="/welcome/bg welcome app.png"
          alt=""
          // width="90"
          // height="90"
          layout="fill"
          objectFit="cover"
          className="flex self-center justify-self-center -z-20 lg:hidden"
        /> */}
        {/* <div className='grid grid-cols-3 items-center py-2 pl-2 pr-5 w-screen md:pr-10 md:pl-5 lg:px-10'> */}
        <div></div>

        <div className='flex text-2xl mx-auto font-bold text-lwfs_blue text-center'>
          LWFS
        </div>

        <div className='flex w-full h-auto relative  items-center cursor-pointer'>
          <div>
           {/* <CircleUser className='flex w-10 h-10 bg-zinc-800 rounded-full p-2 text-white'/> */}
          </div>  
        </div>

        </div>
      }
      
        {/* Navigation Links for Large Screens */}
        <div className="hidden lg:flex items-center space-x-5 text-sm justify-center ">
            <Link href="/home"
              className={pathname === "/home" ? activeClass : inactiveClass}
              onClick={() => router.push("/home")}
            >
              Home
            </Link>

            <Link href="/training"
              className={pathname === "/training" ? activeClass : inactiveClass}
              onClick={() => router.push("/training")}
            >
              Training
            </Link>

            <Link href="/livetv"
              className={pathname === "/livetv" ? activeClass : inactiveClass}
              onClick={() => router.push("/livetv")}
            >
              Live - TV
            </Link>

            <Link href="/store"
              className={pathname === "/store" ? activeClass : inactiveClass}
              onClick={() => router.push("/store")}
            >
              Store
            </Link>
            
            
        </div>

        <div ref={proRef} className='hidden lg:flex'>
          <div className='flex items-center space-x-5 mr-10'>
            <div className='flex items-center'>
            <h1 className='cursor-pointer text-xs lg:text-sm flex items-center gap-1' onClick={profileToggle}>{user?.firstName} {user?.lastName}<FaAngleDown/></h1>
            
            {profile && <>
              <div className='flex absolute top-[50px] translate-y-0 ease-in-out duration-500 right-5 items-center shadow-md  text-red-600 bg-white p-5 z-20  transition translate '>
                <span className='flex rounded-md text-red-500 items-center gap-2'>
                  <AiOutlineLogout className='cursor-pointer' onClick={logout} />
                  <button className='cursor-pointer' onClick={logout} >Logout</button>
                </span>
                
              </div>
            </>}

            </div>
          </div>
        </div>
        
        

      {/* </div> */}
    </div>
  
     
  
</div>


  )
}

export default Navbar