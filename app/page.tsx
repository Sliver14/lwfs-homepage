"use client";

import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Welcome = () => {
    const router = useRouter();

    useEffect(()=>{
        const fetchUserDetails = async () => {
          try {
            const response = await axios.get("/api/auth/tokenverify", {
              withCredentials: true, // Ensure proper spelling
            });
            // setUser(response.data.user);
            // setLoggedIn(true);
            return router.push("/home");
          } catch (error) {
            console.error("Error verifying user:", error)
            // setUser(null);  // Ensure user is null if not logged in
            // setLoggedIn(false);
          }
        };
  
        fetchUserDetails();
      },[]);

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
        <div className='felx items-center justify-center text-center gap-2'>
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
