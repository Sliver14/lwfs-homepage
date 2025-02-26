"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircleUser, ChevronLeft } from "lucide-react";

type Video = {
  id: number;
  title: string;
  img_url: string;
  video_url: string;
};

function WatchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const training = [
    {url: "/welcome/NEW TEACHERS.jpg", link: ""},
    {url: "/welcome/NEW PRINCIPALS.jpg", link: ""},
    {url: "/welcome/15th summit.png", link: ""},
  ];

  const handleSelect = (video: Video) => {
    if (!video.video_url){
        alert("No video availlable for this selection")
        return;
    }
        // Encode the video data in the query params
        router.push(`/watch?id=${video.id}&title=${encodeURIComponent(video.title)}&video_url=${encodeURIComponent(video.video_url)}`);
    };

  const trainingVideos:Video[] = [
    { 
      id: 1, 
      title: "Why you must go to Church", 
      img_url: 
        "/welcome/15th summit.png",
      video_url: 
        "https://res.cloudinary.com/dfi8bpolg/video/upload/v1736329276/samples/dance-2.mp4"
    },
    { id: 2, 
      title: "Jesus Today and Forever Campfire", 
      img_url: 
        "/welcome/15th summit.png",
      video_url: 
        "https://res.cloudinary.com/dfi8bpolg/video/upload/v1736329275/samples/elephants.mp4"
    },
    { id: 3, 
      title: "The Holy Spirit", 
      img_url: 
        "/welcome/15th summit.png",
      video_url: 
        "https://res.cloudinary.com/dfi8bpolg/video/upload/v1736329275/samples/sea-turtle.mp4"
    },
    {
      id: 4,
      title: "Communion",
      img_url:
        "/welcome/15th summit.png",
      video_url: "",
    },
    ]

  const videoUrl = searchParams.get("video_url");

  if (!videoUrl) return <p>No Video selected</p>;

  return (
    <div className="flex flex-col bg-zinc-100 w-screen gap-5">

      {/* Header */}
      <div className="grid grid-cols-3 w-screen p-2 fixed top-0 z-20 shadow-md justify-center items-center">
        <Image
          src="/welcome/bg welcome app.png"
          alt=""
          fill
          className="flex self-center justify-self-center -z-20 lg:hidden"
        />

        <div
          onClick={() => router.push("/training")}
          className="bg-zinc-800 rounded-full h-10 w-10 justify-center items-center p-2 text-white cursor-pointer"
        >
          <ChevronLeft />
        </div>

        <div className="text-3xl font-bold text-white text-center">LWFS</div>

        <div className="flex w-full h-auto justify-end pr-5 relative items-center">
          <CircleUser className="flex w-10 h-10 bg-zinc-800 rounded-full p-2 text-white" />
        </div>

      </div>

      {/* Video player */}
      <div className="flex flex-col pt-8">
        <div className="w-full h-[280px] md:h-[380px] lg:h-[480px]">
          <video
            src={videoUrl}
            controls
            muted={false}
            autoPlay
            controlsList="nodownload"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="text-xl px-5 font-bold">Recent Training</div>

        {/* Recent Training */}
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


        <div className="grid grid-cols-2 bg-white p-2 md:grid md:grid-cols-3 gap-2 lg:grid-cols-4">
        {trainingVideos.map((video)=>(
            <div key={video.id} onClick={()=> handleSelect(video)} className="flex flex-col cursor-pointer bg-gray-100  w-full items-center px-5 justify-center gap-2 transition tranform duration-300 ease-out md:hover:scale-105 ">
                <div className="relative w-48 h-32 lg:h-[120px]">
                    <Image src={video.img_url} alt="" fill className="w-full h-full object-cover rounded-md"/>
                </div>
                <h1 className="w-full text-wrap">
                    {video.title}
                </h1>
            </div>
            
        ))}
                    
        </div>

    </div>
  );
}

function Watch() {
  return (
    <Suspense fallback={<p>Loading video...</p>}>
      <WatchContent />
    </Suspense>
  );
}

export default Watch;
