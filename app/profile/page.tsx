"use client";

import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
// import { ArrowRight,  } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Profile =  () => {
  const router = useRouter();
  const { userDetails } = useUser();
  const handleLogout = async () => {
    try{
      await axios.post("/api/logout");
      router.push("/")
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className='flex flex-col w-screen min-h-screen items-center'>

      {/* Header */}
      <div className='flex fixed top-0 px-5 text-white h-14 w-full items-center z-20'>     
        <div className='flex w-full items-center '>
            
            <div
                onClick={() => router.back()}
                className="hover:bg-gray-100 hover:text-gray-700 rounded-full p-2"
            >
                <ArrowLeftIcon className="w-5 h-5" />
            </div>

            <div className='flex text-2xl font-medium mx-auto '>
              More
            </div>

            <div>
                
            </div>
        </div>
        
      </div>

      <div className='flex flex-col relative h-36 w-full items-center bg-blue-950'>
        <div className='flex absolute -bottom-8 justify-between items-center shadow-lg bg-white rounded-md h-auto p-3 w-[80%]'>
          <div className='w-14 h-14 rounded-full bg-lwfs_orange text-white text-2xl font-medium justify-center items-center text-center p-3.5'>{userDetails?.firstName?.charAt(0).toUpperCase() || "?"}</div>
          <div >
            <h1>{userDetails?.firstName || "Guest"} {userDetails?.lastName}</h1>
            <span className='text-sm text-gray-500'>{userDetails?.email || "No email avalibale"}</span>
          </div>
          <ChevronRightIcon className='w-3 h-3'/>

        </div>
      </div>

      {/* Menu List */}
      <ul className="flex flex-col w-full p-10 gap-10 mt-14">
        {["Shop Order History", "About Us", "Contact Us", "Our Privacy Policy"].map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item}</span>
            <ChevronRightIcon className="w-5 h-5" />
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}
      className='flex py-3 bg-[#ff2121] text-xl font-medium text-white rounded-md w-72 justify-center text-center'>Logout</button>
    </div>
  )
}

export default Profile
