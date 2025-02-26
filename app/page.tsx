"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loadingAnimation from "@/public/loading.json"; // Ensure you have a Lottie JSON file

const Welcome = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          await axios.get("/api/auth/tokenverify", { withCredentials: true });
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
          console.error("Error verifying user:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUserDetails();
    }, []); // Adding router as a dependency is best practice

    // Redirect when authentication succeeds
    useEffect(() => {
      if (isAuthenticated) {
        router.replace("/home");
      }
    }, [isAuthenticated, router]);

    // if (isLoading) {
    //   return (
    //     <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
    //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400"></div>
    //     </div>
    //   );
    // }

    if (isLoading) {
      return (
        <div className="w-screen h-screen flex items-center justify-center bg-black">
          <Lottie animationData={loadingAnimation} className="w-40 h-40 text-white" />
        </div>
      );
    }

    if (isAuthenticated) {
      return null; // Prevent rendering the Welcome page if authenticated
    }
  

  return (
    <div className="relative w-screen h-screen overflow-hidden">
        <Image
        src="/welcome/bg welcome app.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="-z-10"
        />

        <Image 
            src="/welcome/Ellipse 1 copy.png"
            alt="obj1"
            width={150}
            height={150}
            className='absolute -right-14 -top-14 lg:-right-10 lg:-top-10'
        />

        <Image 
            src="/welcome/Ellipse 1.png"
            alt="obj2"
            width={150}
            height={150}
            className='absolute -left-4 -bottom-4 lg:-left-2 lg:-bottom-2'
        />

        <Image 
            src="/welcome/gcap.png"
            alt="obj2"
            width={70}
            height={70}
            className='absolute left-0 top-[65vh] lg:top-[60vh]'
        />


      <div className='flex flex-col relative w-full h-screen justify-center items-center gap-5'>
        <Image
            src="/welcome/welcome text.png"
            alt="Welcome to"
            width={250}
            height={250}
            // layout="fill"
            // objectFit="cover"
            className="flex w-[250px] h-auto lg:w-[350px]"
        />

        <Image
            src="/welcome/Logo-shadow.png"
            alt="Welcome to"
            width={150}
            height={150}
            // layout="fill"
            // objectFit="cover"
            className="flex w-[150px] h-auto lg:w-[200px] "
        />
        <div className='flex flex-col items-center justify-center text-center gap-2'>
            <h1 className='text-yellow-400 text-2xl '>
                LOVEWORLD
            </h1>
            <h1 className='text-white text-3xl font-bold'>
                FOUNDATION SCHOOL
            </h1>
        </div>

        <div className='flex flex-col gap-3 mt-12 md:flex-row md:gap-8'>
            <button onClick={() => router.push("/signin")} className='flex py-2 rounded-full bg-white text-2xl text-center items-center justify-center self-center font-bold text-black w-80 cursor-pointer'>Login
            </button>

            <button onClick={() => router.push("/signup")} className='flex py-2 rounded-full bg-yellow-400 text-2xl text-center items-center justify-center self-center font-bold text-indigo-950 w-80 cursor-pointer'>Sign-up
            </button>
        </div>
        
        
      </div>
      
    </div>
  )
}

export default Welcome
