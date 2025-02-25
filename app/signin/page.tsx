"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios, { AxiosError } from "axios";
// import { FaChevronLeft } from "react-icons/fa6";
// import { AiFillHome } from "react-icons/ai";
// import { MdEmail } from "react-icons/md";
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';


const Signin: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword ] = useState(false);

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
    router.push("/home"); // Redirect to dashboard or home page
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
    <div className='flex relative flex-col items-center justify-center w-screen h-screen lg:grid lg:grid-cols-2 lg:gap-0 overflow-hidden'>

        <Image 
        src="/welcome/bg welcome app.png"
        alt="bg"
        layout="fill"
        objectFit="cover"
        className='flex -z-10 lg:hidden'
        />

        
        {/* left */}
        <div className='hidden lg:flex relative w-full h-full justify-center items-center'>
          <Image 
             src="/welcome/bg welcome app.png"
              alt="bg"
              layout="fill"
              objectFit="cover"
              className='hidden lg:flex -z-10 '
           />

           <Image
            src="/welcome/Logo-shadow.png"
            alt=""
            // layout="fill"
            width="200"
            height="200"
            objectFit="contain"
            className="hidden lg:flex w-[200px] h-auto"
          />
        </div>

          {/* Right */}
        <div className='hidden lg:flex relative flex-col w-full h-full'>
        <Image 
        src="/welcome/bg-transparent.jpg"
        alt="bg"
        layout="fill"
        objectFit="cover"
        className='hidden lg:flex -z-10'
        />
        
          <div className='hidden lg:flex flex-col w-full h-full'>
          <div className='flex flex-col my-auto gap-8'>
            <div className='flex justify-center items-center'>
                <h2 className='text-4xl text-lwfs_blue font-bold' >welcome back! </h2>
            </div>
          
            <div className='flex flex-col gap-5 items-center w-full top-80'>
              
              <div className='flex relative w-full justify-center items-center'>
              <Mail className='absolute left-[9%] text-xl opacity-50' />
                <input onChange={(event) => setEmail(event.target.value)} className='border rounded-full pl-[11%] border-lwfs_blue p-2 focus:outline-none focus:ring-1 focus:ring-lwfs_blue text-lg w-[90%]' type="email" autoComplete="email" placeholder='Email'/>
              </div>

              <div className='flex relative w-full justify-center items-center'>
              <Lock className='absolute left-[9%] text-xl opacity-50'/>
                <input className='border rounded-full pl-[11%] border-lwfs_blue p-2 focus:outline-none focus:ring-1 focus:ring-lwfs_blue text-lg w-[90%]' type={showPassword ? "text" : "password"}  placeholder='Password'/>
                <button onClick={()=> setShowPassword(!showPassword)} className='flex justify-center items-center'>
                  {showPassword ? <Eye size={24} className='absolute right-[10%] opacity-50'/> : <EyeOff size={24} className='absolute  opacity-50 right-[10%] ' />}
                </button>
                
              </div>
                

                <button onClick={handleSubmit} 
                className={`bg-lwfs_blue m-5 w-[90%] rounded-full transition transform ease-out duration-200 text-2xl hover:scale-95 hover:shadow-sm text-white p-2 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#360d97]text-white"}`} 
                disabled={loading} >{loading ? "Logging..." : "Login"}</button>
                {error && <p className='text-red-500'>{error}</p>}
                {success && <p className='text-green-500'>{success}</p>}

                
            </div>

          <div className="flex items-center gap-2 px-10">
            <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          

          <div className='flex flex-col gap-5 text-md justify-center items-center'>
            <span onClick={()=>{router.push("/signup")}}>Are you new here? <a className="font-bold text-md hover:underline cursor-pointer" >Signup</a></span>

            <span onClick={()=>{router.push("/signup")}} className="font-bold hover:underline cursor-pointer">Forgot password? </span>
          </div>
          
          </div>

          

          </div>
        </div>

        {/* Mobile view */}
        <Image
          src="/welcome/Logo-shadow.png"
          alt=""
          // layout="fill"
          width="90"
          height="90"
          objectFit="contain"
          className="flex absolute top-10 z-20 lg:hidden"
        />

        <div className='flex flex-col w-screen h-screen bg-white mt-20 rounded-t-3xl lg:hidden'>
          <div className='flex flex-col my-auto gap-8'>
            <div className='flex justify-center items-center'>
                <h2 className='text-4xl text-lwfs_blue font-bold' >welcome back! </h2>
            </div>
          
            <div className='flex flex-col gap-3 items-center w-screen top-80'>
              
              <div className='flex relative w-full justify-center items-center'>
              <Mail className='absolute left-[9%] text-xl opacity-50' />
                <input onChange={(event) => setEmail(event.target.value)} className='border rounded-full pl-[11%] border-lwfs_blue p-2 focus:outline-none focus:ring-1 focus:ring-lwfs_blue text-lg w-[90%]' type="email" autoComplete="email" placeholder='Email'/>
              </div>

              <div className='flex relative w-full justify-center items-center'>
              <Lock className='absolute left-[9%] text-xl opacity-50'/>
                <input className='border rounded-full pl-[11%] border-lwfs_blue p-2 focus:outline-none focus:ring-1 focus:ring-lwfs_blue text-lg w-[90%]' type={showPassword ? "text" : "password"}  placeholder='Password'/>
                <button onClick={()=> setShowPassword(!showPassword)} className='flex justify-center items-center'>
                  {showPassword ? <Eye size={24} className='absolute right-[10%] opacity-50'/> : <EyeOff size={24} className='absolute  opacity-50 right-[10%] ' />}
                </button>
                
              </div>
                

                <button onClick={handleSubmit} 
                className={`bg-lwfs_blue m-5 w-[90%] transition transform ease-out duration-200 text-2xl hover:scale-95 hover:shadow-sm rounded-2xl text-white p-3 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#360d97]text-white"}`} 
                disabled={loading} >{loading ? "Logging..." : "Login"}</button>
                {error && <p className='text-red-500'>{error}</p>}
                {success && <p className='text-green-500'>{success}</p>}

                
            </div>

          <div className="flex items-center gap-2 px-10">
            <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          

          <div className='flex flex-col gap-5 text-md justify-center items-center'>
            <span onClick={()=>{router.push("/signup")}}>Are you new here? <a className="font-bold text-md hover:underline cursor-pointer" >Signup</a></span>

            <span onClick={()=>{router.push("/signup")}} className="font-bold hover:underline cursor-pointer">Forgot password? </span>
          </div>
          
          </div>

          

        </div>
        
       
    
    </div>
  )
}

export default Signin
