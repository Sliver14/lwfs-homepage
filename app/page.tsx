"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import  ImageSlider from "./ImageSlider";
// import  LogoSlider from "./LogoSlider";
// import Modal from "../component/Modal"
import VideoSlider from "./VideoSlider";
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
    const slides = [
      {url: "../images/hslhs.jpeg", link: "https://healingstreams.tv/LHS", title: "Healing Streams Live healing Services with Pastor Chris"},
      {url: "../images/jan-jan.jpg", link: "https://lwfoundationschool.org/homes/", title: "Jan-comm"},
      {url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1736329279/samples/smile.jpg", title: "logo"},
    ];

  const videoSlides = [
    { url: "https://res.cloudinary.com/dfi8bpolg/video/upload/v1737680677/evtznnwqnmgyshvhzidd.mp4"
      , title: "video1" },
  ];

  const testimonySlides = [
    {url: "/images/2@2x.jpg"},
    {url: "/images/4@2x.jpg"},
    {url: "/images/5@2x.jpg"},
  ]

  return (
    <div className='flex flex-col w-screen text-sm bg-white font-sans gap-5'>

       <div className='flex flex-col pt-12 pb-20 gap-5' >

      {/* <Modal/> */}
      {/* Resource center video slider */}
      <div className="w-screen ">
        <div className="w-screen h-64 overflow-hidden md:h-[350px] md:w-1/2">
          {/* Auto-scroll enabled with 5-second interval */}
          <VideoSlider slides={videoSlides} autoScroll={true} interval={15000}/>
        </div> 
      </div>
      
      {/* Loveworld fs backdrop */}
      {/* <div className='flex flex-col relative w-screen'>
        <div className='relative h-52 max-h-[600px] w-screen md:h-80 lg:h-96'>
          <Image className='absolute object-cover object-[50%_20%] h-full w-full' fill alt='' src='/images/bg-bg.jpeg'/>
          <div className='absolute inset-0 bg-black opacity-65'></div>
        </div>
        
        <div className='absolute inset-0 flex items-center justify-start w-screen p-10'> 
          <div className=' flex flex-col text-white text-2xl font-semibold md:text-4xl md:font-bold first-letter:lg:font-extrabold lg:text-5xl'>
            <p className='text-lw_yellow text-xl md:text-2xl lg:text-4xl'>Loveworld</p>
            <p className='font-bold md:font-extrabold '>Foundation School</p>
          </div>
        </div>
        
      </div> */}

      {/* Foundation School */}
      {/* <div className='flex flex-col  md:py-5 gap-5'> */}
        <div className='flex flex-col w-screen'>
          {/* <div className='flex flex-col gap-2 px-5 text-wrap md:px-10'>
            <p className='font-bold text-xl text-lw_blue'>Welcome to Loveworld</p>
            <p className='font-semibold text-lg text-lw_yellow'>Foundation School</p>
            <p className='font-medium text-base text-lw_blue'>The Foundation School is a compulsory part of our Church Ministry, with clearly defined Aims and Objectives as summarized below.</p>
                <p>1.  To preserve every eligible first timer or new convert in your Church, and successfully transit a soul saved into a soul won.</p>
                <p>2.  To introduce the new converts and new members in your Church to the Foundational Doctrines of our Christianity and the Principles and Structures of our Ministry</p>
                <p>3.  To help them understand our Vision and Mission, and see their definite role in them.</p>
                <p>4.  To introduce them to the discipline and rigor of consistent learning, self-study, carrying out Christian exercises and producing results.</p>
                <p>5.  To introduce them to fellowship with fellow Christians and the Holy Spirit.</p>
              <p>6.  To set them on an irreversible path of continuous growth and service in the Local Assembly and beyond.</p> 
                <p>7.  To fulfill the first requirement for eligibility and consideration for higher responsibilities in Ministry</p>
          </div> */}
        </div>

        {/* Up coming programmes */}
        <div className="relative flex flex-col justify-center items-center w-screen md:px-10">
          <div className="w-screen h-[250px] shadow-lg md:h-[450px] lg:h-[650px]">
            <ImageSlider slides={slides} autoScroll={true} interval={20000} />
          </div>
          <div className='hidden md:flex flex-col px-2 gap-5 py-8'>
            <h1 className='text-lw_red text-4xl font-extrabold self-center'>Upcoming Events</h1>
            {/* <h1 className='text-wrap' >March 2025, a time for divine encounter</h1>  */}
          </div> 
        </div>
      {/* </div> */}
 

      {/* platforms */}
      <div className='flex flex-col gap-5 md:flex-row w-screen md:gap-5 md:p-5'>
          <div className='flex flex-col bg-blue-950 text-white gap-5 px-8 py-12 text-wrap hover:shadow-md translate transform ease-out duration-150 md:hover:scale-105 md:flex-1'>
            <h1 className='text-3xl font-bold md:text-wrap'>Online Class</h1>
            <p>The Loveworld Foundation School is a Christian education platform by Pastor Lanre Alabi, offering courses to strengthen faith and spiritual growth. It equips believers with foundational biblical teachings and practical insights for victorious living.</p>
            <a href='https://online.lwfoundationschool.org/' target="blank" className='px-5 py-2 rounded-md bg-yellow-500 w-32 text-center text-black hover:bg-opacity-0 hover:border-2 hover:border-solid hover:border-white  hover:text-white transform duration-300 '>Apply Now</a>
          </div>

          <div className='flex flex-col bg-blue-950 text-white gap-5 px-8 py-12 text-wrap hover:shadow-md translate transform ease-out duration-150 md:hover:scale-105 md:flex-1'>
            <h1 className='text-3xl font-bold'>Testimony Bank</h1>
            <p>The Loveworld Foundation School Testimony Bank is a platform where students share testimonies of life transformation and spiritual growth through the teachings of Pastor Chris Oyakhilome.</p>
            <a href='https://lwfoundationschool.org/testimonybank/' target="_blank" className='px-5 py-2 rounded-md bg-yellow-500 w-56 text-center text-black hover:bg-opacity-0 hover:border-2 hover:border-solid hover:border-white hover:text-white transform duration-300'>Share Your Testimony</a>
          </div>
      </div>
          
      {/* Post */}
      <div>
        <div className='relative group flex flex-col h-[350px] w-screen gap-5 justify-end items-center text-center'>
            <Image className='absolute w-full h-full object-cover' alt="" width={500} height={300} src='/images/loading-1q.jpg'/>
            <div onClick={()=>router.push("/posts")} className=' cursor-pointerabsolute inset-0 flex flex-col w-full h-12 self-end justify-self-center text-xl bg-lw_yellow justify-center items-center text-black text-center opacity-0 transition-opacity transform duration-500 group-hover:opacity-90'>
              <h1 className="cursor-pointer" onClick={()=> router.push("/posts")}>View More Post</h1>
            </div>
              
        </div>
      </div>

      {/* Platforms Logo Slider */}
      {/* <div className="relative flex flex-col justify-center items-center w-screen py-10">
        <h1 className='text-2xl font-bold text-center w-screen text-lw_dark_blue uppercase'>Our Platforms</h1>
        <div className="w-screen shadow-lg py-10 ">
          <LogoSlider />
        </div>
      </div> */}

      {/* Testimony slider*/}
      <div className='flex flex-col relative gap-5 w-screen overflow-x-scroll items-center justify-center md:flex md:flex-row'>
        {testimonySlides.map((testimony, index)=>(
          <div key={index} className='flex relative group h-[480px] w-full'>
            <Image src={testimony?.url} className='w-full h-full object-cover' fill alt=''/>
            <a href='https://lwfoundationschool.org/testimonybank/' target="_blank" className='flex flex-col absolute text-xl inset-0 bg-yellow-400 w-full text-black h-12 bottom-8 self-end justify-center items-center text-center opacity-0 group-hover:opacity-90 transform duration-500'>
              <p>Share Your Testimony</p>
            </a>
          </div>
        ))}
        </div>


      {/* Store */}
      <div className='flex flex-col justify-center items-center' >
        <h1>Loveworld Foundation School Products</h1>
        <div></div>
        <button>Visit Store</button>
      </div>

      {/* Prayer of Salvation */}

       </div>     
    </div>
    
  );
}
