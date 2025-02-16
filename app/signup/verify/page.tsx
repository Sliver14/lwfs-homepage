"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaChevronLeft } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";

const Verify = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      console.error("No email found! Redirecting to signup.");
      // Optionally, redirect user to signup if email is missing
      // router.push("/signup");
    }
  }, []);

  // Signup verification
const signupVerification = async (e) => {
  e.preventDefault();
  setLoading(true);
  try{
    const response = await axios.post("/api/auth/signup/verify", { email, code });

    // const { token } = response.data;

    // // Save token to cookies
    // Cookies.set("authToken", token, { expires: 30, secure: process.env.NODE_ENV === "production" , sameSite: "strict" });

    setSuccess(response.data.message);
    router.push("/signin");
    // setIsModalOpen(false);
    // // setLoggedIn(true);
    // window.location.reload();
        
  } catch (error){
    setError(error.response?.data?.error || "Verification failed");
  } finally {
    setLoading(false);
  }
}
  const resendCode = async () =>{
    try{
      const response = await axios.post("api/auth/resendcode", {email});
      setSuccess(response.data.message || "Resend Succeessful")
    }catch(error){
      setError(error.response?.data?.error || "Resend-failed")
    }
  }
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
       <div className='flex w-full p-5 justify-between opacity-50'>
            <FaChevronLeft className='text-xl cursor-pointer transition transform duration-150 ease-out hover:shadow-sm' onClick={()=> router.back()}/>
            <AiFillHome className='text-3xl cursor-pointer transition transform duration-150 ease-out hover:shadow-sm' onClick={()=> router.push("/")}/>
        </div>
      <div className='flex flex-col my-auto gap-5'>
        <div className='flex flex-col justify-center items-center mb-10 gap-5' >
          <h2 className='text-3xl font-bold ' >Check your inbox</h2>
        
        <h2>Enter the verification code sent to {email}</h2>
        <input
          className='border border-lwfs3 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black text-md w-[300px]'
          type="text"
          onChange={(e) => setCode(e.target.value)}
        />
        <button className={`flex  bg-lw_dark_blue text-white py-2 px-5 flex-grow rounded-sm justify-center w-[300px] transition transform ease-out duration-200 hover:scale-95 hover:shadow-sm ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"}`} disabled={loading} onClick={signupVerification}>{loading ? "Loading..." : "Continue"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button className='underline' onClick={resendCode}>Resend-code</button>

        <div className='flex gap-5 text-lg'>
          <buttton className='cursor-pointer' onClick={() => router.push("/signin")}>Signin</buttton>
          <buttton className='cursor-pointer' onClick={() => router.push("/signup")}>Signup</buttton>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Verify
