"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { FaChevronLeft } from "react-icons/fa6";
// import { AiFillHome } from "react-icons/ai";
import { ChevronLeft } from "lucide-react";
import { Eye, EyeOff} from 'lucide-react';
import dynamic from "next/dynamic";

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loadingAnimation from "@/public/Animation - 1739206742214.json"; // Ensure you have a Lottie JSON file

const ChangePassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);  
  const [loading, setLoading] = useState(false); // Loading state
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [showPassword, setShowPassword ] = useState(false);

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

  // Change password
const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setSuccess(false);

  // ✅ Check if passwords match before sending request
  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    setLoading(false);
    return;
  }

  try{
    await axios.post("/api/auth/newpassword", { email, password });

    setSuccess(true);
    setTimeout(() => {
        router.push("/signin");
      }, 3000); // Redirect after 3 seconds
        
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
       
       {success ? (
        <div className="flex flex-col items-center justify-center text-center">
          <Lottie animationData={loadingAnimation} loop={false} className="w-60 h-60" />
          <h2 className="text-2xl font-bold mt-5 text-green-600">Password Changed Successfully!</h2>
          <p className="text-gray-600">Redirecting to sign-in...</p>
        </div>
      ) : (
      <div className='flex flex-col my-auto gap-5'>
        <div className='flex flex-col justify-center items-center text-center text-wrap mb-10 gap-5' >
          <h2 className='text-3xl font-bold ' >Change Password</h2>

        <form onSubmit={changePassword}>
            {/* Password */}
            <div className='flex relative w-full justify-center items-center'>
                <input
                    className='pl-5 border border-lwfs_blue rounded-full p-2 focus:outline-none focus:ring-1 focus:ring-black text-md w-[300px]'
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder='New Password'
                    autoComplete='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={()=> setShowPassword(!showPassword)} className='flex justify-center items-center'>
                    {showPassword ? <Eye size={24} className='absolute right-[10%] opacity-50'/> : <EyeOff size={24} className='absolute  opacity-50 right-[10%] ' />}
                </button>
            </div>
            
          {/* Confirm Password Input */}
          <div className='flex relative w-full justify-center items-center'>
            <input
                className="pl-5 border border-lwfs_blue rounded-full p-2 focus:outline-none focus:ring-1 focus:ring-black text-md w-[300px]"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="Confirm Password"
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={()=> setShowPassword(!showPassword)} className='flex justify-center items-center'>
                {showPassword ? <Eye size={24} className='absolute right-[10%] opacity-50'/> : <EyeOff size={24} className='absolute  opacity-50 right-[10%] ' />}
            </button>
          </div>
        
          <button typeof='submit' className={`flex  text-white py-2 px-5 flex-grow rounded-full justify-center w-[300px] transition transform ease-out duration-200 hover:scale-95 hover:shadow-sm ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"}`} disabled={loading} type='submit'>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
          
        

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        {/* <button className='underline' onClick={resendCode}>Resend Code</button> */}

        {/* <div className='flex gap-5 text-lg'>
          <button className='cursor-pointer bg-lwfs_blue px-2 py-1 rounded-md text-white' onClick={() => router.push("/signin")}>Signin</button>
          <button className='cursor-pointer bg-red-600 px-2 py-1 rounded-md text-white' onClick={() => router.push("/signup")}>Sign up</button>
        </div> */}
        </div>
      </div>
      )}
    </div>
  )
}

export default ChangePassword
