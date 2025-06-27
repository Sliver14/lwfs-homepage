"use client";

import React, { useState, useEffect, useRef } from 'react';
// Removed Next.js useRouter
// Removed Next.js usePathname
// Removed Next.js Link
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa"; // Added FaBars (hamburger) and FaTimes (close X)
import { AiOutlineLogout } from "react-icons/ai";
import axios from 'axios';
import { ShoppingCart } from "lucide-react";
// Removed useUserCart, will simulate cart for demonstration


// Define user type
interface User {
    firstName: string;
    lastName: string;
}

function Navbar() {
    // Replaced useRouter with a simple navigation function for standard web navigation
    const navigateTo = (path: string) => {
        window.location.href = path;
    };

    // Replaced usePathname with window.location.pathname
    const currentPathname = typeof window !== 'undefined' ? window.location.pathname : '/';

    // Hide navbar on these specific routes
    const hideNavbarRoutes = [
        "/signin", "/signup", "/signup/verify", "/", "/watch",
        "/resetpassword", "/reset"
    ];
    // Check if the current pathname is in the hideNavbarRoutes list
    const hideNavbar = hideNavbarRoutes.includes(currentPathname);

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

    // Simulate cart for demonstration, as context is not available
    const [cartItemCount, setCartItemCount] = useState(3); // Placeholder value

    // Styles for active and inactive navigation links
    const activeClass = "flex items-center px-4 py-3 rounded-lg font-medium bg-red-600 text-white shadow-md transform scale-100 transition duration-300 ease-out";
    const inactiveClass = "flex items-center text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300 ease-out";

    // Ref for the sidebar to detect clicks outside of it
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    // Effect to handle clicks outside the sidebar to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            // Close sidebar if click is outside of it, and it's currently open
            if (sidebarRef.current && !sidebarRef.current.contains(target) && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        };

        // Add event listener for clicks outside only when sidebar is open
        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup: remove event listener when component unmounts or sidebar closes
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]); // Re-run effect when isSidebarOpen state changes

    // Effect to fetch user details on component mount or when loggedIn state changes
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get("/api/auth/tokenverify", {
                    withCredentials: true,
                });
                setUser(response.data.user);
                setLoggedIn(true);
            } catch (error) {
                console.error("Error verifying user:", error);
                setUser(null); // Ensure user is null if not logged in
                setLoggedIn(false);
            }
        };

        fetchUserDetails();
    }, [loggedIn]); // Depends on loggedIn to refetch if state changes

    // Effect to close sidebar and scroll to top when currentPathname changes
    useEffect(() => {
        setIsSidebarOpen(false); // Close sidebar on route change
        window.scrollTo(0, 0); // Scroll to top on route change
    }, [currentPathname]);

    // Function to toggle the sidebar open/closed
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to handle user logout
    const logout = async () => {
        try {
            await axios.post("/api/logout", {}, { withCredentials: true });
            setUser(null); // Reset user state
            setLoggedIn(false); // Reset loggedIn state
            setIsSidebarOpen(false); // Close sidebar on logout
            navigateTo("/signin"); // Redirect to sign-in page
        } catch (error) {
            console.error("Logout failed:", error);
            // Optionally, show an error message to the user
        }
    };

    // If the current route is in hideNavbarRoutes, do not render the Navbar
    if (hideNavbar) return null;

    return (
        <div className='relative w-full z-50'>
            {/* Main Header Bar (Always visible at the top) */}
            
            <div className='flex items-center justify-between p-4 bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-lg h-16'>
                {/* Hamburger Icon to toggle sidebar */}
                <button
                    onClick={toggleSidebar}
                    className='text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 rounded-md transition-colors'
                    aria-label="Toggle navigation menu"
                >
                    {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* LWFS Title (Always visible) */}
                <div className='flex-grow text-center'>
                    <span className='text-2xl lg:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400'>
                        LWFS
                    </span>
                </div>

                {/* Cart Icon (Always visible) */}
                <div onClick={() => navigateTo("/cart")} className='relative cursor-pointer hover:scale-105 transition-transform duration-200'>
                    <ShoppingCart className='text-white text-2xl' aria-label="Shopping Cart" />
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white'>
                        {cartItemCount} {/* Using simulated cart item count */}
                    </span>
                </div>
            </div>

            {/* Sidebar Overlay (Visible only when sidebar is open, acts as a backdrop) */}
            {isSidebarOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 lg:hidden' // Hidden on large screens, as sidebar is persistent there
                    onClick={toggleSidebar} // Close sidebar when clicking overlay
                    aria-hidden="true" // Indicate to screen readers this is decorative
                ></div>
            )}

            {/* Sidebar Menu (Always rendered, its visibility controlled by transform property) */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full bg-gray-900 shadow-2xl transform z-50
                    w-64 md:w-80 lg:w-64 xl:w-72 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:flex lg:flex-col // On large screens, always visible and column flex
                    transition-transform duration-300 ease-in-out
                `}
            >
                <div className='flex flex-col p-6 h-full'>
                    {/* Close Button (inside sidebar, only for mobile/tablet) */}
                    <div className='flex justify-end mb-8 lg:hidden'>
                        <button
                            onClick={toggleSidebar}
                            className='text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 p-2 rounded-md transition-colors'
                            aria-label="Close navigation menu"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>

                    {/* User Info (inside sidebar) */}
                    {loggedIn && user ? (
                        <div className='flex items-center space-x-3 mb-8 pb-4 border-b border-gray-700'>
                            <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold'>
                                {user.firstName ? user.firstName[0] : ''}{user.lastName ? user.lastName[0] : ''}
                            </div>
                            <div>
                                <p className='text-lg font-semibold text-white'>
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className='text-sm text-gray-400'>
                                    Welcome back!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className='mb-8 pb-4 border-b border-gray-700'>
                            <a href="/signin" onClick={() => { toggleSidebar(); navigateTo("/signin"); }} className="text-blue-400 hover:text-blue-300 font-semibold text-lg">
                                Sign In
                            </a>
                        </div>
                    )}

                    {/* Navigation Links (inside sidebar) */}
                    <nav className='flex flex-col space-y-4 flex-grow'>
                        <a href="/home" className={currentPathname === "/home" ? activeClass : inactiveClass}>
                            Home
                        </a>
                        <a href="/training" className={currentPathname === "/training" ? activeClass : inactiveClass}>
                            Training
                        </a>
                        <a href="/livetv" className={currentPathname === "/livetv" ? activeClass : inactiveClass}>
                            Live - TV
                        </a>
                        <a href="/store" className={currentPathname === "/store" ? activeClass : inactiveClass}>
                            Store
                        </a>
                        {/* Cart Link for Mobile/Tablet within sidebar - now always visible in sidebar as well */}
                        <a href="/cart" className={currentPathname === "/cart" ? activeClass : inactiveClass}>
                            <ShoppingCart className='mr-3' /> My Cart ({cartItemCount})
                        </a>
                    </nav>

                    {/* Logout Button (at the bottom of sidebar) */}
                    {loggedIn && (
                        <button
                            onClick={logout}
                            className='flex items-center justify-center px-4 py-3 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 transition-colors mt-auto shadow-md'
                        >
                            <AiOutlineLogout className='mr-3' size={20} /> Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;