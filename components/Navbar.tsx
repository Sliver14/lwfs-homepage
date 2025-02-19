"use client";
// import Cookies from "js-cookie";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link  from 'next/link';
import { GrMenu } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { LiaPowerOffSolid } from "react-icons/lia";
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

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdown2Open] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState(false);

    const activeClass = "flex px-3 py-2 rounded-lg font-medium bg-opacity-90 transform duration-300 bg-red-500 text-white";
    const inactiveClass = "flex text-black px-3 py-2 rounded-lg hover:bg-gray-300 hover:bg-opacity-25 hover:text-black transform transform ease-out duration-300 hover:scale-95";

    const navRef = useRef<HTMLDivElement | null>(null);
    const nav2Ref = useRef<HTMLDivElement | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const proRef = useRef<HTMLDivElement | null>(null);

    // Function to handle clicks outside the nav
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const target = event.target as Node;
        if (navRef.current && !navRef.current.contains(target)) {
            setDropdownOpen(false);
        }
        if (nav2Ref.current && !nav2Ref.current.contains(target)) { // Fix: Correct ref usage
            setDropdown2Open(false);
        }
        if (
          sidebarRef.current && 
          !sidebarRef.current.contains(target) && 
          target instanceof Element && // Ensure target is an Element
          !target.closest(".toggle-btn") // Now safe to use closest()
        ) { 
          setIsOpen(false); 
        }
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
    },[]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
 
    const toggleSidebar = () => {
      setIsOpen(!isOpen); 
    }

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

    const toggleDropdown2 = () => {
      setDropdown2Open(!dropdownOpen2);
    };

    const profileToggle = () => {
      setProfile(!profile)
    }

    // const logout = async () => {
    //   await fetch("/api/logout", { method: "POST" });
    //   setUser(null);   // ✅ Reset user state
    //   setLoggedIn(false);  // ✅ Reset loggedIn state
    //   router.push("/signin");
    // };
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
    <div className='relative flex flex-col '>
      
      {/* Modal */}
     {/* {letsLogin && <Modal isOpen={letsLogin} onClick={() =>setLetsLogin(true) } />}  */}

      {/* Navbar */}
    <div className='flex flex-col w-screen bg-white fixed top-0 z-20 shadow-md' >
    
      <div className='flex justify-between align-middle py-2 pl-2 pr-5 w-screen md:pr-10 md:pl-5 lg:px-10'>
        {/* Toggle */}
        <button className="cursor-pointer px-4 text-2xl align-middle lg:hidden" onClick={toggleSidebar}>
          <GrMenu/>
        </button>
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

            {/* Laptop Dropdown for Platforms */}
            <div ref={navRef} className="relative transition transform duration-200 ease-out">
              <button
                onClick={toggleDropdown} 
                className="flex items-center text-black px-3 py-2 cursor-pointer"
              >
                Platforms <FaAngleDown />
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 bg-white shadow-lg mt-2 rounded-md w-48 py-2 ">
                  <a href='https://online.lwfoundationschool.org/' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      Online Class
                    </li>
                  </a>
                  
                  <a href='https://lwfoundationschool.org/testimonybank/' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      Testimony Bank
                    </li>
                  </a>
                  
                  <a href="https://lwfoundationschool.org/store/" target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      LWFS Store
                    </li>
                  </a>
                  

                  <a href="https://lwfs-portal-elrt.vercel.app/" target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition transform ease-out duration-200 hover:scale-95"
                    >
                      Portal
                    </li>
                  </a>
                  
                </ul>
              )}
            </div>

            <Link href="/postpage"
              className={pathname === "/postpage" ? activeClass : inactiveClass}
              onClick={() => router.push("/postpage")}
            >
              Posts
            </Link>

            <Link href="/contact"
              className={pathname === "/contact" ? activeClass : inactiveClass}
              onClick={() => router.push("/contact")}
            >
              Contact
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
    
    
    {/* Mobile Opened Sidebar */}
    <div ref={sidebarRef} className={`fixed top-0 left-0 justify-center w-screen h-full bg-white overflow-hidden transition transform ease-in-out duration-300 z-20  ${isOpen ? "-translate-x-12" : "-translate-x-full"}`}>
    <div className='flex flex-col w-screen ml-9'>
            
    {/* Mobile Toggle */}
    <div className='flex flex-row w-full align-middle items-center border-solid border-b-[0.1px]' >
      {/* <div className='flex gap-2 text-xs'>
        <div className='flex flex-col bg-gray-900 text-xl font-bold rounded-full text-white self-center  w-12 h-12 items-center justify-center '>
          {user?.lastName ? user.lastName.charAt(0) : ''} {user?.firstName ? user?.firstName.charAt(0) : ''}
        </div> 
        <h1 className='cursor-pointer text-sm flex items-center gap-1' onClick={profileToggle}>{user?.firstName} {user?.lastName}</h1> 
      </div> */}
      <button onClick={toggleSidebar} className="ml-3 p-5 text-lg" ><IoMdClose />
      </button>
    </div>

      <div className='flex flex-col h-screen' >
        <ul className='px-5 space-y-2 ' >
          <li className=' p-2 cursor-pointer transition transform ease-out duration-200 ' onClick={() => {toggleSidebar(); router.push("/")}}>
            Home
          </li>
          <li className='p-2 cursor-pointer transition transform ease-out duration-200' onClick={() => {toggleSidebar(); router.push("/livetv")}}>
          Live TV
          </li>
          
          {/* Mobile Dropdown for Platforms*/}
          <div ref={nav2Ref} className="relative z-50 w-full">
              <button
                onClick={toggleDropdown2} 
                className="flex items-center text-black px-2 pr-10 py-2 cursor-pointer justify-between w-full"
              >
               <h1>Platforms</h1> <FaAngleDown />
              </button>
              {dropdownOpen2 && (
                <ul className="absolute left-0 bg-white shadow-lg mt-2 rounded-md w-full py-2">
                  <a href='https://online.lwfoundationschool.org/' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer transition transform ease-out"
                      onClick={() => {
                        setDropdown2Open(false);
                      }}
                    >
                      Online Class
                    </li>
                  </a>
                  
                  <a href='https://lwfoundationschool.org/testimonybank/' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer transition transform ease-out"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                    >
                      Testimony Bank
                    </li>
                  </a>
                  
                  <a href='https://lwfoundationschool.org/store/' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer transition transform ease-out"
                    >
                      LWFS Store
                    </li>
                  </a>
                  
                  <a href='https://lwfoundationschool.org/login' target='_blank'>
                    <li
                      className="px-4 py-2 cursor-pointer transition transform ease-out"
                    >
                      Portal
                    </li>
                  </a>
                  
                </ul>
              )}
            </div>

          <li className='p-2 cursor-pointer transition transform ease-out duration-200' onClick={() => {toggleSidebar(); router.push("/postpage")}}>
          Posts
          </li>

          <div className=' flex p-2 text-center items-center border-solid border-t-[0.1px] border-b-[0.1px]'>
            {!loggedIn ? <h1 onClick={()=> router.push("/signin")} className='cursor-pointer' >Signin/Register</h1> : <div>
            <button className='flex gap-2 cursor-pointer text-red-500 text-xs w-full py-2 items-center' onClick={logout}><LiaPowerOffSolid className='cursor-pointer text-lg font-semibold' onClick={logout} />LOGOUT</button>
            </div>}
          </div>
        </ul>
        
        
        
      </div>
      
      
    </div>
      
        
    </div>
  
</div>


  )
}

export default Navbar