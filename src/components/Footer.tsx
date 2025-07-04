"use client";
import React from 'react'
import { useRouter, usePathname } from 'next/navigation';

function Footer () {
    const router = useRouter();
    const pathname = usePathname();

    // Hide navbar on these routes
    const hideNavbar = ["/signin", "/signup", "/signup/verify"].includes(pathname);

    if (hideNavbar) return null;

  return (
      <div className='flex flex-col bg-slate-800  w-screen pt-20 text-gray-300 justify-center items-center md:justify-start md:items-start'>
        
        {/* Footer */}

        <div className='flex flex-col text-sm md:flex-row lg:text-base md:p-5 md:gap-8 '>

        {/* About Us */}
        <div className='flex flex-col px-5 w-[95%] gap-3 text-center text-md md:px-0 md:text-left md:flex-grow md:flex-1' >
          <h1 className='text-2xl text-white font-bold self-center py-3  md:self-start '>ABOUT US</h1>
          <h1 >Loveworld Foundation School is the first and Essential Training School for all New Converts and New Members in our Churches.</h1>
          
        </div>
        
        {/* Platforms */}
        <div className='flex flex-col px-5 pt-10 gap-1 justify-center items-center text-center  md:justify-start md:pt-0 md:text-left md:px-0 md:items-start md:flex-grow md:flex-1'>
          <h1 className='text-2xl font-bold uppercase text-white py-3'>Platforms</h1>
          <p className='hover:text-white  cursor-pointer' >Online Class</p>
          <p className='hover:text-white  cursor-pointer'>Resource Center</p>
          <p className='hover:text-white  cursor-pointer'>LWFS Store</p>
          <p className='hover:text-white  cursor-pointer'>Testimony Bank</p>
          <p className='hover:text-white  cursor-pointer' onClick={()=>{router.push("/livetv")}}>Live TV</p>
        </div>

        {/* Contact Us */}
        <div className='flex flex-col pt-10 gap-1 justify-center items-center text-center  md:justify-start md:items-start md:pt-0 md:text-left md:flex-grow md:flex-1' >
          <h1 className='text-2xl font-bold text-white uppercase py-3' >Contact Us </h1>
          <div className='pb-3'>PO Box Aseese, Lagos Ibadan Express.</div>
          <div className='flex gap-2'>
            <p>Email Us :</p>
            <a className='hover:text-white ' href='mailto:info@lwfoundationschool.com'>info@lwfoundationschool.com</a>
          </div>

          <div className='flex gap-2'>
            <p>Call Us :</p>
            <a className='hover:text-white ' href='tel:+2348035024986'>+234 80 3502 4986</a>
          </div>

          <div className='flex gap-2'>
            <p>Kingschat :</p>
            <a className='hover:text-white ' href='https://kingschat.online/user/lwfsch' target="_blank">LW Foundation School</a>
          </div>
        
        </div>
        </div>
        

        

        {/* Copy Rights */}
        <div className='flex flex-col bg-gray-900 mt-10 py-10 pr-3 w-screen justify-center items-center'>
        <div className='flex flex-col ml-5 gap-5 text-xs text-gray-300 lg:text-sm '>
          <div className='flex flex-col justify-center items-center text-center gap-5 flex-1'>
          <h1 className='text-white text-base font-medium lg:text-lg'>LOVEWORLD  FOUNDATION SCHOOL</h1>
            <p>Copyright &copy; 2025 All Rights Reserveed.</p>
          </div>
          
        </div>
        </div>
        
      </div>
  )
}

export default Footer
