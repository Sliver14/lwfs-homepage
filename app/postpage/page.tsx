"use client";
import React, { useEffect, useState } from 'react'
import { IoTimeOutline } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import { IoChevronForwardOutline } from "react-icons/io5";
import axios from "axios";
import Image from 'next/image';

interface Post {
  id: number;
  postPhoto: string;
  postTitle: string;
  postBody: string;
  createdAt: string;
}

function Postpage() {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try{
        const response = await axios.get("/api/post/fetchpost");
        //  setListOfPosts(response.data);
        setListOfPosts(response?.data);
        // console.log(response?.data)
      } catch(error){
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div className='mt-20'>

<div className='flex flex-col relative w-screen'>
        <div className='relative h-52 max-h-[600px] w-screen md:h-80 lg:h-96'>
          <Image className='absolute object-cover object-[50%_20%] h-full w-full' fill src='/images/bg-bg.jpeg' alt=''/>
          <div className='absolute inset-0 bg-black opacity-65'></div>
        </div>
        
        <div className='absolute inset-0 flex items-center justify-start w-screen'> 
          <div className='flex absolute bottom-10 flex-col text-white text-4xl items-center w-full justify-center text-center md:text-5xl md:bottom-16  lg:text-6xl lg:bottom-20'>
          <p className='flex text-center'>Post Page</p>
          </div>
        </div>
        
      </div>

      {/* LWFS News (blog) e.g graduation highlights */}
      <div className='flex flex-col w-screen items-center justify-center'>
      <div className='flex flex-col w-[98%] shadow-lg' >
        <h1 className='font-bold text-xl ml-10 my-2'>Recent Posts</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>

        {listOfPosts.map((post) => ( 
          <div key={post.id} className='flex flex-col text-sm md:text-xs px-1 border-2 rounded-md border-gray-100  hover:border-[0.5px] hover:border-lw_gray hover:rounded-lg transition transform duration-150 ease-out'>
              <div className='flex relative flex-col h-[200px] w-[98%] mt-3' >
                <Image className='flex h-full w-full rounded-lg object-cover transition tranform duration-200 ease-out lg:hover:scale-105' fill src={post.postPhoto}  alt=''/>
              </div>
              <div className='flex gap-5 my-3'>
                <button className='bg-red-500 text-white text-sm px-2 py-[3px] rounded-sm'>Post</button>
                <h1 className='flex items-center gap-1'><IoTimeOutline />{new Date(post.createdAt).toLocaleString()}</h1>
                <h1 className='flex items-center gap-1'><GrView /> 293</h1>
              </div>

              <div className='flex flex-col  '>
                <h1 className='font-bold text-base'>{post.postTitle}</h1>
                <p className='text-sm text-gray-700 w-[98%]'>{post.postBody}</p>
              </div>
              <button className='flex items-center w-40 gap-1 border-2 border-slate-200 text-lwfs4 px-5 py-2 my-2 hover:font-bold hover:shadow-sm hover:bg-lwfs2 hover:text-lwfs3 hover:border-0 hover:shadow-black rounded-md'>Read More <IoChevronForwardOutline className='text-xl'/></button>   
          </div>
            
          ))}
        </div>
          
          
        </div>  


      {/* </div> */}
      </div>
    </div>
  )
}

export default Postpage
