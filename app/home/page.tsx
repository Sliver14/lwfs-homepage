"use client";
import React from 'react'
// import { useRouter } from 'next/navigation';
// import  ImageSlider from "./ImageSlider";
// import  LogoSlider from "./LogoSlider";
// import Modal from "../component/Modal"
// import VideoSlider from "./VideoSlider";
import Image from 'next/image';

export default function Home() {
  // const router = useRouter();
    const slides = [
      {url: "/images/hslhs.jpeg", link: "https://healingstreams.tv/LHS", title: "Healing Streams Live healing Services with Pastor Chris"},
      {url: "/images/jan-jan.jpg", link: "https://lwfoundationschool.org/homes/", title: "Jan-comm"},
      {url: "/images/hslhs.jpeg", link: "https://healingstreams.tv/LHS", title: "Healing Streams Live healing Services with Pastor Chris"},
      
    ];

    const training = [
      {url: "/welcome/NEW TEACHERS.jpg", link: ""},
      {url: "/welcome/NEW PRINCIPALS.jpg", link: ""},
    ]

  const testimonySlides = [
    {url: "/images/2@2x.jpg"},
    {url: "/images/4@2x.jpg"},
    {url: "/images/5@2x.jpg"},
  ]

  return (
    <div className='flex flex-col w-screen text-sm bg-white font-sans gap-5'>

       <div className='flex flex-col pt-14 pb-20 gap-5' >

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

        {/* Training */}
        <div className="relative flex items-center w-full h-auto overflow-x-auto ">
        <div className="flex gap-2">
          {training.map((train, index) => (
            <div key={index} className="relative w-52 h-40 shadow-lg flex-shrink-0">
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

  {/* Text Section (for larger screens) */}
  {/* <div className="hidden md:flex flex-col px-2 gap-5 py-8">
    <h1 className="text-lw_red text-4xl font-extrabold self-center">Upcoming Events</h1>
  </div> */}
</div>


      {/* platforms */}
      {/* <div className='flex flex-col gap-5 md:flex-row w-screen md:gap-5 md:p-5'>
          <div className='flex flex-col bg-gray-800 text-white gap-5 px-8 py-12 text-wrap hover:shadow-md translate transform ease-out duration-150 md:hover:scale-105 md:flex-1'>
            <h1 className='text-3xl font-bold md:text-wrap'>Online Class</h1>
            <p>The Loveworld Foundation School is a Christian education platform by Pastor Lanre Alabi, offering courses to strengthen faith and spiritual growth. It equips believers with foundational biblical teachings and practical insights for victorious living.</p>
            <a href='https://online.lwfoundationschool.org/' target="blank" className='px-5 py-2 rounded-md bg-yellow-500 w-32 text-center text-black hover:bg-opacity-0 hover:border-2 hover:border-solid hover:border-white  hover:text-white transform duration-300 '>Apply Now</a>
          </div>

          <div className='flex flex-col bg-gray-800 text-white gap-5 px-8 py-12 text-wrap hover:shadow-md translate transform ease-out duration-150 md:hover:scale-105 md:flex-1'>
            <h1 className='text-3xl font-bold'>Testimony Bank</h1>
            <p>The Loveworld Foundation School Testimony Bank is a platform where students share testimonies of life transformation and spiritual growth through the teachings of Pastor Chris Oyakhilome.</p>
            <a href='https://lwfoundationschool.org/testimonybank/' target="_blank" className='px-5 py-2 rounded-md bg-yellow-500 w-56 text-center text-black hover:bg-opacity-0 hover:border-2 hover:border-solid hover:border-white hover:text-white transform duration-300'>Share Your Testimony</a>
          </div>
      </div> */}

      {/* Testimony slider*/}
      <div className='flex relative w-full h-auto overflow-x-scroll items-center justify-center md:flex md:flex-row'>
        {testimonySlides.map((testimony, index)=>(
          <div key={index} className='flex relative group h-48 w-48'>
            <Image src={testimony?.url} className='w-full h-full object-contain' fill alt=''/>
          </div>
        ))}
        </div>

      {/* Prayer of Salvation */}

       </div>     
    </div>
    
  );
}
