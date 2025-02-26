"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Video {
  id: number;
  title: string;
  img_url: string;
  video_url: string;
}

const Signin = () => {
  const router = useRouter();
    
    const training = [
      {url: "/welcome/NEW TEACHERS.jpg", link: ""},
      {url: "/welcome/NEW PRINCIPALS.jpg", link: ""},
      {url: "/welcome/15th summit.png", link: ""},
    ]

    const trainingVideos:Video[] = [
        { 
          id: 1, 
          title: "Introduction to Dancing", 
          img_url: 
            "https://res.cloudinary.com/dfi8bpolg/image/upload/v1738850381/kraoewzabh80yttg1t4x.png",
          video_url: 
            "https://res.cloudinary.com/dfi8bpolg/video/upload/v1736329276/samples/dance-2.mp4"
        },
        { id: 2, 
          title: "video 2", 
          img_url: 
            "https://res.cloudinary.com/dfi8bpolg/image/upload/v1737187751/vnk3s8x5l4zla8novtw9.jpg",
          video_url: 
            "https://res.cloudinary.com/dfi8bpolg/video/upload/v1736329275/samples/elephants.mp4"
        },
        { id: 3, 
          title: "video 3", 
          img_url: 
            "https://res.cloudinary.com/dfi8bpolg/image/upload/v1737189705/uyfdklu0hoozpkxy4ixr.jpg",
          video_url: 
            "https://res.cloudinary.com/dfi8bpolg/video/upload/v1736329275/samples/sea-turtle.mp4"
        },
        {
          id: 4,
          title: "Cloudy Skies",
          img_url:
            "https://res.cloudinary.com/dfi8bpolg/image/upload/v1736329281/cld-sample.jpg",
          video_url: "",
        },
        {
          id: 5,
          title: "Morning Coffee",
          img_url:
            "https://res.cloudinary.com/dfi8bpolg/image/upload/v1736329280/samples/coffee.jpg",
          video_url: "https://res.cloudinary.com/dfi8bpolg/video/upload/v1737680677/evtznnwqnmgyshvhzidd.mp4",
        },
    ]

    const handleSelect = (video: Video) => {
      if (!video.video_url){
        alert("No video availlable for this selection")
        return;
      }
        // Encode the video data in the query params
        router.push(`/watch?id=${video.id}&title=${encodeURIComponent(video.title)}&video_url=${encodeURIComponent(video.video_url)}`);
    };

  return (
    
    <div className="flex flex-col gap-3 px-1 pt-16 w-screen lg:pl-48 overflow-hidden">
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

      <div className='flex w-full text-2xl font-bold'>
        <h1>Training</h1>
      </div>

      <div className="grid grid-cols-2  md:grid md:grid-cols-3 gap-5 lg:grid-cols-4">
        {trainingVideos.map((video)=>(
          <div key={video.id} onClick={()=> handleSelect(video)} className="flex flex-col cursor-pointer bg-gray-100  w-full items-center justify-center gap-2 transition tranform duration-300 ease-out md:hover:scale-105 ">
          <div className="relative w-full h-[200px] lg:h-[120px]">
          <Image src={video.img_url} alt="" fill className="w-full h-full object-cover rounded-md"/>
          </div>
          <h1 className="w-screen text-center">{video.title}</h1>
          </div>
            
        ))}
        

        
      </div>
    </div>
  )
}

export default Signin
