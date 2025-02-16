"use client";
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import videojs from "video.js";
import Cookies from "js-cookie";
import io from "socket.io-client";
import axios from 'axios';
import Hls from "hls.js";
import HlsPlayer from "../component/HlsPlayer";

const LiveTv = () => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [onCommentPosted, setOnCommentPosted] = useState("");
  // const apiUrl = import.meta.env.VITE_API_URL;
  const [comments, setComments] = useState([]);
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [groupParticipation, setGroupParticipation] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [successMessage, setSuccessMessage] = useState('');

//Hls component
  // useEffect(() => {
  //   if (Hls.isSupported()) {
  //     const hls = new Hls();
  //     hls.loadSource("https://res.cloudinary.com/dfi8bpolg/video/upload/v1737680677/evtznnwqnmgyshvhzidd.mp4");
  //     hls.attachMedia(videoRef.current);

  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       videoRef.current.play();
  //     });

  //     return () => {
  //       hls.destroy();
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  // Live-tv Attendance
  useEffect(() => {
    if (!hasSubmitted) {
    const recordAttendance = async () => {
      try {
        await axios.post(
          "/api/livetv/attendance",
          { page: "live_tv" },
          {
            withCredentials: true,
          }
        );

      } catch (error) {
        console.error("Error recording attendance:", error);
      }
    };
  
    recordAttendance();
  }
  }, [hasSubmitted]);
  
//Post comment
  const postComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    try {
      const response = await axios.post("/api/livetv/comment", { content }, {
        withCredentials: true, // Include user token from cookies
      });
      setContent(''); // Clear the input
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
 
  // Fetch Comment
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("/api/livetv/fetchcomment", {
          withCredentials: true, // Ensure cookies are sent
        });
        setComments(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

// update groupAttendance
const updateAttendance = async () => {
  setLoading(true)
  try{
    const response = await axios.post("/api/livetv/update", {groupParticipation}, {
      withCredentials: true, // Ensure cookies are sent
    });
    setSuccessMessage("Attendance successfully updated!");
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
  } catch(error){
    console.log({error: "error updating attendance"});
    // setError({error: "error updating attendance"});
  } finally{
    setLoading(false);
  }
}

  return (
    
    <div className='flex flex-col pt-16 text-sm md:w-screen'>
      {/* <AdminDashboard individualParticipation/> */}

      <div className='flex flex-col md:flex-row md:w-screen md:overflow-x-hidden md:gap-3 md:px-2'>
        {/* LIVE TV */}
        <div className='flex flex-col md:w-[60%]'>
          <div className='w-screen h-auto md:w-full  '>
            <video 
              src="https://lwfoundationschool.org/livetv/wp-content/uploads/2024/08/14TH%20SUMMIT%20REBROADCAST.mp4" 
              // type="application/x-mpegURL"
              className="w-full h-full object-cover" 
              controls
              muted={false}
              controlsList="nodownload"
            >
            </video>
          {/* <video ref={videoRef} controls width="100%" /> */}
          {/* <HlsPlayer className="w-full h-full object-contain" src="https://res.cloudinary.com/dfi8bpolg/video/upload/v1737680677/evtznnwqnmgyshvhzidd.mp4" /> */}
          </div>

          <div className='flex text-xs justify-center w-screen items-center my-5 md:w-full space-x-2 px-2 lg:space-x-5'>
            <button className='px-2 py-1 text-black bg-yellow-400 rounded-md lg:py-3 lg:px-5 '>Share Testimony</button>
            <button className='px-2 py-1 text-white bg-green-600 rounded-md lg:py-3 lg:px-5'>Receive Salvation</button>
            <div className='flex relative w-auto space-x-2'>
              <input className='w-24 text-center text-gray-600 text-xl focus:outline-none focus:ring-0 ' onChange={(e) => setGroupParticipation(e.target.value) } type='number' min="1" placeholder='1'/>
              <button onClick={updateAttendance} className={`bg-red-600 px-2 py-1 text-white rounded-md lg:py-3 lg:px-5`} >Update Attendance</button>
             
              {successMessage && (
                <div className="fixed top-10 left-20  bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LIVE CHAT */}
        <div className='flex relative flex-col mt-5 pb-5 md:mt-0 md:w-[40%]'>
          <div className='w-screen h-auto md:w-full'>
            <img className='w-full h-full object-cover' src="../images/year.jpeg" alt="" />
          </div>
          <div className='flex mt-2 w-screen md:w-full'>
            <button className='bg-blue-700 px-8 py-2 text-white md:px-5'>Live Chat</button>
            <button className='bg-yellow-400 px-8 py-2 md:px-5'>Programme Line-UP</button>
          </div>
          
          <div className='flex flex-col bg-white p-3 border-[1.5px] border-solid border-lw_gray w-screen '>

          <div ref={scrollRef} className='flex flex-col overflow-y-auto max-h-[250px] md:w-full md:h-[350px]'>
          {comments.slice() // Create a copy to avoid mutating the original array
          .reverse().map((comment) => (
              <div key={comment.id} className='flex flex-col px-2 py-1 mb-5 border-2 border-solid border-gray-300 rounded-md '>
                <p className='text-xs'>{comment.content}</p>
                <div className='flex gap-5'>
                <p className='text-xs text-gray-500 italic'>{comment.user?.firstName}</p> 
                <p className='text-xs text-gray-500'>{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              </div>
          ))}
          </div>
            
            <div className='flex flex-col gap-2'>
              <textarea value={content} onChange={(event)=>{setContent(event.target.value)}} className='p-2 grow rounded-md border-[1.5px] border-solid border-black min-h-20' type='text' placeholder='Type your comment here'/>
              <button onClick={postComment} className='bg-blue-950 w-full text-lg text-white self-center  py-2 rounded-md cursor-pointer'>Submit</button>
            </div>
          </div>
          
        </div>
      </div>
      

    </div>
    
  )
}

export default LiveTv
