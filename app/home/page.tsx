"use client";
import React from 'react'
import Image from 'next/image';

export default function Home() {

    const slides = [
      {url: "/images/hslhs.jpeg", link: "https://healingstreams.tv/LHS", title: "Healing Streams Live healing Services with Pastor Chris"},
      {url: "/images/jan-jan.jpg", link: "https://lwfoundationschool.org/homes/", title: "Jan-comm"},
      {url: "/images/hslhs.jpeg", link: "https://healingstreams.tv/LHS", title: "Healing Streams Live healing Services with Pastor Chris"},
      
    ];
    
  const testimonySlides = [
    {url: "/images/2@2x.jpg"},
    {url: "/images/4@2x.jpg"},
  ]

  return (
    <div className='flex flex-col w-screen text-sm bg-zinc-100 font-sans gap-5'>
        
        <div className='relative w-full h-64'>
              <Image
                src="/lwfsbg.png"
                alt='background'
                fill
                priority
                className='object-cover --z-10'
              />

            <div className='absolute inset-0 bg-black bg-opacity-50 --z-10'/>
            
            <div className='flex h-full relative flex-col justify-center text-xl gap-3 font-semibold items-center z-10'>
              <h1 className='flex w-64 text-center text-white text-3xl text-wrap'>Preparing the Saints for Ministry</h1>
              <button className='flex rounded-md bg-lwfs_blue text-white px-5 py-2 '>Enrol Today
              
              </button>
            </div>
          
        </div>

       <div className='flex flex-col pb-20 gap-5' >       

        {/* <div className='flex flex-col bg-white p-2'> */}
          {/* <div className='flex w-full p-3 text-xl font-semibold'> */}
            {/* <h1>Recent Training</h1> */}
          {/* </div> */}
          {/* Training */}
          {/* <div className="relative flex items-center w-full h-auto overflow-x-auto ">
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
          </div> */}
        {/* </div> */}
        

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

        {/* Top video */}
        {/* <div className="relative w-screen">
          <div className="w-screen h-64 overflow-hidden md:h-[350px] md:w-1/2 relative"> */}
            {/* <video
              ref={videoRef}
              src="https://res.cloudinary.com/dfi8bpolg/video/upload/v1737680677/evtznnwqnmgyshvhzidd.mp4"
              autoPlay
              muted={isMuted}
              loop
              controlsList="nodownload"
              className="w-full h-full object-cover"
            /> */}
            {/* Mute/Unmute Button */}
            {/* <button
              onClick={toggleMute}
              className="absolute top-3 left-3 bg-black bg-opacity-50 text-opacity-50 text-white px-3 py-1 rounded-full text-xs z-20 transition translate duration-200 ease-in-out hover:bg-opacity-90 hover:text-opacity-90 shadow-md"
              aria-label={isMuted ? "Unmute Video" : "Mute Video"}
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
          </div>
        </div> */}
        

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
