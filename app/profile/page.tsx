"use client";

import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Profile =  () => {
  const router = useRouter();
  const handleLogout = async () => {
    try{
      await axios.post("/api/logout");
      router.push("/")
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      Profile
      <button onClick={handleLogout}
      className='flex py-2 bg-lwfs_orange rounded-xl w-48 justify-center text-center'>Logout</button>
    </div>
  )
}

export default Profile
