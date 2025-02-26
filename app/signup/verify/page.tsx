"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { FaChevronLeft } from "react-icons/fa6";
// import { AiFillHome } from "react-icons/ai";
import { ChevronLeft } from "lucide-react";

const Verify = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);  
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
const signupVerification = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setSuccess(null);

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
    if (axios.isAxiosError(error)) {
      setError(error.response?.data?.error || "Verification failed");
    } else {
      setError("An unknown error occurred.");
    }
  } finally {
    setLoading(false);
  }
}
  const resendCode = async () =>{
    try{
      const response = await axios.post("/api/auth/resendcode", {email});
      setSuccess(response.data.message || "Resend Succeessful")
    }catch(error){
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Resend failed");
      } else {
        setError("An unknown error occurred.");
      }
    }
  }
  return (
    <div className='flex flex-col items-center justify-center gap-5 w-screen h-screen'>
       <div className='flex w-full p-5'>
        <div
            onClick={() => router.back()}
            className="bg-zinc-800 rounded-full h-10 w-10 p-2 text-white cursor-pointer"
          >
            <ChevronLeft />
        </div>
       </div>
       
      <div className='flex flex-col my-auto gap-5'>
        <div className='flex flex-col justify-center items-center text-center text-wrap mb-10 gap-5' >
          <h2 className='text-3xl font-bold ' >Check your inbox</h2>
        
          <h2 className='flex text-wrap'>Enter the verification code sent to {email}</h2>
        <form onSubmit={signupVerification} className='flex flex-col gap-5'>
          <input
            className='border border-blue-950 rounded-full p-2 focus:outline-none focus:ring-1 focus:ring-black text-md w-[300px]'
            type="text" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className={`flex  bg-lw_dark_blue text-white py-2 px-5 flex-grow rounded-full justify-center w-[300px] transition transform ease-out duration-200 hover:scale-95 hover:shadow-sm ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"}`} disabled={loading} type='submit'>
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>
        

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button className='underline' onClick={resendCode}>Resend Code</button>

        <div className='flex gap-5 text-lg'>
          <button className='cursor-pointer bg-lwfs_blue px-2 py-1 rounded-md text-white' onClick={() => router.push("/signin")}>Signin</button>
          <button className='cursor-pointer bg-red-600 px-2 py-1 rounded-md text-white' onClick={() => router.push("/signup")}>Sign up</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Verify
