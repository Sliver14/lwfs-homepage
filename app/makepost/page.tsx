"use client";
import React, { useState } from 'react'
import axios from "axios";

function Makepost() {
  const [postPhoto, setPostPhoto] = useState<File | null>(null); // To store the selected file
  const [uploading, setUploading] = useState<boolean>(false); // Track upload status
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string>(""); // URL of uploaded file
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

    const handlePost = async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!postPhoto) {
        alert("Please select a file to upload");
        return;
      }

      setUploading(true); // Indicate upload in progress
  
        try{
          // Upload file to Cloudinary
          const formData = new FormData();
          formData.append("file", postPhoto); // Attach the file
          formData.append("upload_preset", "lwfs_app"); // Replace with your preset name

          const cloudinaryResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/dfi8bpolg/image/upload`, // Replace YOUR_CLOUD_NAME
            formData
          );

          const uploadedUrl: string = cloudinaryResponse.data.secure_url; // Cloudinary URL
          setCloudinaryUrl(uploadedUrl);

          const response = await axios.post("/api/post", {
            postPhoto: uploadedUrl, 
            postTitle, 
            postBody,
        });
          setSuccess(response.data?.message)
        } catch (error: unknown){
          if (axios.isAxiosError(error)) {
            setError(error.response?.data?.error || "Verification failed");
          } else {
            setError("An unexpected error occurred");
          }
          console.error("Failed to upload", error);
        } finally {
          setUploading(false); // Reset upload status
        }
    }
  return (
    <div className='flex flex-col mt-28'>
      <div className='flex flex-col justify-center items-center'>
        <input 
            onChange={(event) => setPostPhoto(event.target.files?.[0] || null)} type='file'
        />
        <input 
            onChange={(event) => setPostTitle(event.target.value)} 
            type='text' 
            placeholder='Title'
        />
        <input 
            onChange={(event) => setPostBody(event.target.value)} type='text' placeholder='Body'
        />
        <button onClick={handlePost} disabled={uploading} >   
            {uploading ? "Posting..." : "Post"}
        </button>
        {success && <> <p className='text-green-600'>{success}</p></>}
        {error && <> <p className='text-red-700'>{error}</p></>}
        {cloudinaryUrl && (
        <div>
          <h3>Uploaded File:</h3>
          <a href={cloudinaryUrl} target="_blank" rel="noopener noreferrer">
            {cloudinaryUrl}
          </a>
        </div>
      )}
      </div>
    </div>
  )
}

export default Makepost
