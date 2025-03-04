"use client";
import React from 'react'
import axios from 'axios';

const page =  () => {
  const handleLogout = async () => {
    try{
      await axios.post("/api/logout");
    }catch(error){

    }
  }
  return (
    <div>
      Profile
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default page
