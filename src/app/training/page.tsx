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
          title: "Why you must go to Church", 
          img_url: 
            "/welcome/15th summit.png",
          video_url: 
            "https://lwfoundationschool.org/livetv/wp-content/uploads/2024/08/14TH%20SUMMIT%20REBROADCAST.mp4"
        },
        { id: 2, 
          title: "Jesus Today and Forever Campfire", 
          img_url: 
            "/welcome/15th summit.png",
          video_url: 
            "https://lwfoundationschool.org/livetv/wp-content/uploads/2024/08/14TH%20SUMMIT%20REBROADCAST.mp4"
        },
        { id: 3, 
          title: "The Holy Spirit", 
          img_url: 
            "/welcome/15th summit.png",
          video_url: 
            "https://lwfoundationschool.org/livetv/wp-content/uploads/2024/08/14TH%20SUMMIT%20REBROADCAST.mp4"
        },
        {
          id: 4,
          title: "Communion",
          img_url:
            "/welcome/15th summit.png",
          video_url: "https://lwfoundationschool.org/livetv/wp-content/uploads/2024/08/14TH%20SUMMIT%20REBROADCAST.mp4",
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
    
    <div className="flex flex-col gap-3 px-1 py-16 w-screen bg-zinc-100 lg:pl-48 overflow-hidden">
      {/* Training */}
      <div className="relative flex items-center bg-white p-2 w-full h-auto overflow-x-auto ">
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

      <div className="grid grid-cols-2  md:grid md:grid-cols-3 gap-2 lg:grid-cols-4">
        {trainingVideos.map((video)=>(
          <div key={video.id} onClick={()=> handleSelect(video)} className="flex flex-col cursor-pointer bg-white p-2  w-full items-center px-5 justify-center gap-2 transition tranform duration-300 ease-out md:hover:scale-105 ">

            <div className="relative w-48 h-48 lg:h-[120px]">
              <Image src={video.img_url} alt="" fill className="w-full h-full object-cover rounded-md"/>
            </div>
            <h1 className="w-full text-wrap">{video.title}</h1>
          </div>
            
        ))}
        

        
      </div>
    </div>
  )
}

export default Signin
