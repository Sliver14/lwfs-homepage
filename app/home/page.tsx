"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
// import  ImageSlider from "./ImageSlider";
// import  LogoSlider from "./LogoSlider";
// import Modal from "../component/Modal"
// import VideoSlider from "./VideoSlider";
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
    const slides = [
      {url: "/images/hslhs.jpeg", link: "https://healingstreams.tv/LHS", title: "Healing Streams Live healing Services with Pastor Chris"},
      {url: "/images/jan-jan.jpg", link: "https://lwfoundationschool.org/homes/", title: "Jan-comm"},
      {url: "/images/hslhs.jpeg", link: "https://healingstreams.tv/LHS", title: "Healing Streams Live healing Services with Pastor Chris"},
      
    ];

    const training = [
      {url: "/welcome/NEW TEACHERS.jpg", link: ""},
      {url: "/welcome/NEW PRINCIPALS.jpg", link: ""},
      {url: "/welcome/15th summit.png", link: ""},
    ]
    
  const testimonySlides = [
    {url: "/images/2@2x.jpg"},
    {url: "/images/4@2x.jpg"},
  ]

  return (
    <div className='flex flex-col w-screen text-sm bg-zinc-100 font-sans gap-5'>

       <div className='flex flex-col py-14 pb-20 gap-5' >

      {/* Top video */}
      <div className="w-screen ">
        <div className="w-screen h-64 overflow-hidden md:h-[350px] md:w-1/2">
          <video 
            src="https://res.cloudinary.com/dfi8bpolg/video/upload/v1737680677/evtznnwqnmgyshvhzidd.mp4"
            autoPlay
            muted
            loop
            controls
            controlsList="nodownload"
            className="w-full h-full object-cover"
          />
          
        </div> 
        </div>

        <div className='flex flex-col bg-white p-2'>
          <div className='flex w-full p-3 text-xl font-semibold'>
            <h1>Recent Training</h1>
          </div>
          {/* Training */}
          <div className="relative flex items-center w-full h-auto overflow-x-auto ">
            <div className="flex gap-2">
              {training.map((train, index) => (
                <div key={index} onClick={()=> router.push("/training")} className="relative w-52 h-40 shadow-lg flex-shrink-0 cursor-pointer">
                  <Image 
                    src={train.url} 
                    alt="" 
                    fill               
                    className='h-full w-full object-cover rounded-xl'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        

        <div className='flex flex-col bg-white p-2'>
          <div className='flex w-full p-3 text-xl font-semibold'>
            <h1>Upcoming Program</h1>
          </div>
          {/* Up coming programmes */}
          <div className="relative flex items-center w-full h-auto overflow-x-auto ">
            <div className="flex gap-2">
              {slides.map((slide, index) => (
                <div key={index} className="relative w-72 h-40 shadow-lg flex-shrink-0">
                  <Image 
                    src={slide.url} 
                    alt="" 
                    fill               
                    className='h-full w-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        

      <div className='flex flex-col bg-white p-2'>
        <div className='flex w-full p-3 text-xl font-semibold'>
          <h1>Testimony Bank</h1>
        </div>
        {/* Testimony slider*/}
        <div className='flex relative w-full h-auto overflow-x-scroll gap-2 items-center justify-center md:flex md:flex-row'>
          {testimonySlides.map((testimony, index)=>(
            <div key={index} className='flex relative group h-48 w-48'>
              <Image src={testimony?.url} className='w-full h-full object-contain' fill alt=''/>
            </div>
          ))}
        </div>
      </div>
      

       </div>     
    </div>
    
  );
}
