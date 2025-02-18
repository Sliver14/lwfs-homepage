"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios, { AxiosError } from "axios";
import { FaChevronLeft } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";


const Signin: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

  // Function to handle sign-in
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const response = await axios.post("/api/auth/signin", { email });
    // const { token } = response.data;

    // Success message
    // setSuccess(response.data.message);

    // ✅ Cookies are set from the **server**, so no need for js-cookie here

    setSuccess(response.data.message);
    router.push("/"); // Redirect to dashboard or home page
    router.refresh();

  } catch (error: unknown) {
    console.error("Sign-in error:", error);

    // const errorMessage = error.response?.data?.error ?? "Sign-in failed";

  //   if (errorMessage.includes("user not verified")) {
  //     setError("User not verified. Redirecting to verification...");
  //     setTimeout(() => router.push("/signup/verify"), 2000); // Give user time to see the message
  //   } else {
  //     setError(errorMessage);
  //   }
  // } finally {
  //   setLoading(false);
  // }

    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.error ?? "Sign-in failed";

      if (errorMessage.includes("User not verified")) {
          setError("User not verified. Redirecting to verification...");
          setTimeout(() => router.push("/signup/verify"), 2000);
      } else {
          setError(errorMessage);
      }
    } else {
        setError("An unknown error occurred.");
    }
    } finally {
    setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
        <div className='flex w-full p-5 justify-between opacity-50'>
            <FaChevronLeft className='text-xl transition cursor-pointer transform duration-150 ease-out hover:shadow-sm' onClick={()=> router.back()}/>
            <AiFillHome className='text-3xl transition cursor-pointer transform duration-150 ease-out hover:shadow-sm' onClick={()=> router.push("/")}/>
        </div>
      <div className='flex flex-col my-auto  gap-5'>
        <div className='flex justify-center items-center' >
            <h2 className='text-3xl font-bold ' >Sign In</h2>
        </div>
        
        <div className='flex flex-col items-center' >
            <input onChange={(event) => setEmail(event.target.value)} className='border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black text-lg w-[250px]' type="email" autoComplete="email" placeholder='Email'/>
            <button onClick={handleSubmit} 
            className={`bg-lw_blue mt-5 w-[250px] transition transform ease-out duration-200 hover:scale-95 hover:shadow-sm rounded-md text-white p-2 mb-5 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`} 
            disabled={loading} >{loading ? "Signing In..." : "Sign In"}</button>
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>{success}</p>}
            <span onClick={()=>{router.push("/signup")}}>New here? <a className="text-blue-500 hover:underline cursor-pointer" >Create Account</a></span>
        </div>
    </div> 
    
    </div>
  )
}

export default Signin
