"use client";

import React, { useState, useEffect, useRef } from 'react';
// Removed Next.js useRouter
// Removed Next.js usePathname
// Removed Next.js Link
import { FaBars, FaTimes } from "react-icons/fa"; // Added FaBars (hamburger) and FaTimes (close X)
import { AiOutlineLogout } from "react-icons/ai";
import { ShoppingCart, Home, Tv, BookOpen, Store, User } from "lucide-react";
import { useUserCart } from '@/context/UserCartContext';
import { useUser } from '@/context/UserContext';


// Define user type
interface User {
    firstName: string;
    lastName: string;
}

function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPathname, setCurrentPathname] = useState('/');
    const { cart } = useUserCart();
    const { userDetails, logout } = useUser();

    // Styles for active and inactive navigation links (commented out as not currently used)
    // const activeClass = "flex items-center px-4 py-3 rounded-lg font-medium bg-red-600 text-white shadow-md transform scale-100 transition duration-300 ease-out";
    // const inactiveClass = "flex items-center text-gray-200 px-4 py-3 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300 ease-out";

    // Ref for the sidebar to detect clicks outside of it
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    // Calculate cart item count
    const cartItemCount = cart.cartItems.reduce((total, item) => total + item.quantity, 0);

    // Prevent hydration errors by only rendering after mount
    useEffect(() => {
        setMounted(true);
        setCurrentPathname(window.location.pathname);
    }, []);

    // Replaced useRouter with a simple navigation function for standard web navigation
    const navigateTo = (path: string) => {
        window.location.href = path;
    };

    // Hide navbar on these specific routes
    const hideNavbarRoutes = [
        "/signin", "/signup", "/signup/verify", "/", "/watch",
        "/resetpassword", "/reset"
    ];
    // Check if the current pathname is in the hideNavbarRoutes list
    const hideNavbar = hideNavbarRoutes.includes(currentPathname);

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
    const handleLogout = async () => {
        setIsSidebarOpen(false); // Close sidebar on logout
        await logout(); // This will handle the logout and redirect
    };

    // Don't render anything until mounted to prevent hydration errors
    if (!mounted) {
        return null;
    }

    // If the current route is in hideNavbarRoutes, do not render the Navbar
    if (hideNavbar) return null;

    return (
        <>
            {/* Sidebar Overlay - only visible when sidebar is open on mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-50
                    w-64 transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">L</span>
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-lg">LWFS</h1>
                                <p className="text-gray-400 text-xs">Foundation School</p>
                            </div>
                        </div>
                        
                        {/* Close button - only visible on mobile */}
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden text-gray-400 hover:text-white p-2 rounded-md transition-colors"
                            aria-label="Close sidebar"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-6 border-b border-gray-700">
                        {userDetails ? (
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        {userDetails.firstName?.[0]}{userDetails.lastName?.[0]}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-semibold truncate">
                                        {userDetails.firstName} {userDetails.lastName}
                                    </p>
                                    <p className="text-gray-400 text-sm truncate">
                                        Welcome back!
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <a 
                                    href="/signin" 
                                    onClick={() => { toggleSidebar(); navigateTo("/signin"); }}
                                    className="text-blue-400 hover:text-blue-300 font-semibold"
                                >
                                    Sign In
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <a
                            href="/home"
                            onClick={() => { toggleSidebar(); navigateTo("/home"); }}
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition duration-300 ease-out ${
                                currentPathname === "/home"
                                    ? "bg-red-600 text-white shadow-md transform scale-100"
                                    : "text-gray-200 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            <Home className="w-5 h-5 mr-3" />
                            Home
                        </a>

                        <a
                            href="/livetv"
                            onClick={() => { toggleSidebar(); navigateTo("/livetv"); }}
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition duration-300 ease-out ${
                                currentPathname === "/livetv"
                                    ? "bg-red-600 text-white shadow-md transform scale-100"
                                    : "text-gray-200 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            <Tv className="w-5 h-5 mr-3" />
                            Live TV
                        </a>

                        <a
                            href="/training"
                            onClick={() => { toggleSidebar(); navigateTo("/training"); }}
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition duration-300 ease-out ${
                                currentPathname === "/training"
                                    ? "bg-red-600 text-white shadow-md transform scale-100"
                                    : "text-gray-200 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            <BookOpen className="w-5 h-5 mr-3" />
                            Training
                        </a>

                        <a
                            href="/store"
                            onClick={() => { toggleSidebar(); navigateTo("/store"); }}
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition duration-300 ease-out ${
                                currentPathname === "/store"
                                    ? "bg-red-600 text-white shadow-md transform scale-100"
                                    : "text-gray-200 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            <Store className="w-5 h-5 mr-3" />
                            Store
                        </a>

                        <a
                            href="/cart"
                            onClick={() => { toggleSidebar(); navigateTo("/cart"); }}
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition duration-300 ease-out ${
                                currentPathname === "/cart"
                                    ? "bg-red-600 text-white shadow-md transform scale-100"
                                    : "text-gray-200 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5 mr-3" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                            Cart
                        </a>

                        <a
                            href="/more"
                            onClick={() => { toggleSidebar(); navigateTo("/more"); }}
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition duration-300 ease-out ${
                                currentPathname === "/more"
                                    ? "bg-red-600 text-white shadow-md transform scale-100"
                                    : "text-gray-200 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            <User className="w-5 h-5 mr-3" />
                            More
                        </a>
                    </nav>

                    {/* Logout Button - only show if user is logged in */}
                    {userDetails && (
                        <div className="p-4 border-t border-gray-700">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 text-gray-200 hover:bg-gray-700 hover:text-white rounded-lg transition duration-300 ease-out"
                            >
                                <AiOutlineLogout className="w-5 h-5 mr-3" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Button - only visible on mobile */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow-lg"
                aria-label="Open sidebar"
            >
                <FaBars size={20} />
            </button>
        </>
    );
}

export default Navbar;