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
    
    <div className="flex flex-col px-1 w-screen lg:pl-48 overflow-hidden">
      <div className="flex text-4xl items-center py-5">Training Videos</div>
      <div className="flex flex-col  md:grid md:grid-cols-3 gap-5 lg:grid-cols-4">
        {trainingVideos.map((video)=>(
          <div key={video.id} onClick={()=> handleSelect(video)} className="flex flex-col cursor-pointer bg-gray-100  w-full rounded-md items-center justify-center gap-2 transition tranform duration-300 ease-out md:hover:scale-105 ">
          <div className="relative w-full h-[200px] lg:h-[120px]">
          <Image src={video.img_url} alt="" fill className="w-full h-full object-cover"/>
          </div>
          <h1 className="w-screen text-center">{video.title}</h1>
          </div>
            
        ))}
        

        
      </div>
    </div>
  )
}

export default Signin
