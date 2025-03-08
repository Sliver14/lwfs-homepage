"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useUserCart } from "../context/UserCartContext";
import { ArrowLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

const ProductDetailsComponent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const productId = searchParams.get("id") || "";
    const name = searchParams.get("name") || "Unknown Product";
    const imageUrl = searchParams.get("imageUrl");
    const description = searchParams.get("description") || "No description available";
    const price = searchParams.get("price") || "0";
    // const searchParams = new URLSearchParams(window.location.search);
    const colors = JSON.parse(decodeURIComponent(searchParams.get("colors") || "[]"));
    const [ quantity, setQuantity ] = useState<number>(1); 
    const [selectedColor, setSelectedColor] = useState<{ hex: string, name: string } | null>(null);
    const { userId } = useUser(); // Get user ID from context
    const { cart, fetchCart } = useUserCart();

    // Set first color as default when colorsArray is available
    useEffect(() => {
        if (colors?.length > 0) {
            setSelectedColor(colors[0]); // Store the whole color object
        }
    }, []);

   const handleAddToCart = async () => {
    if (!userId) {
        console.error("User ID is missing");
        return;
    }

    if (!selectedColor) {
        console.error("No color selected");
        return;
    }
    try{
        const response = await axios.post("/api/cart/add", {productId, userId, quantity, color: selectedColor.name});
        console.log("Added to cart:", response.data);
        await fetchCart();
    }catch(error){
        console.error("Error adding to cart:", error);
    }
   }

  if (!imageUrl) return <p>No item selected</p>;
  return (
    <div className="flex relative flex-col bg-zinz-100 w-screen pt-16 h-full">
        {/* Header */}
      <div className='flex fixed top-0 px-5 bg-white h-14 w-full items-center z-20'>     
        <div className='flex w-full items-center '>
            
            <div
                onClick={() => router.back()}
                className="hover:bg-gray-100 rounded-full p-2"
            >
                <ArrowLeftIcon className="w-5 h-5" />
            </div>

            <div className='flex font-bold mx-auto '>
            Product Details
            </div>

            <div onClick={()=> router.push("/cart")} className='flex h-auto justify-end relative items-center cursor-pointer'>
                <div className='flex relative'>
                    <ShoppingCartIcon className='text-lwfs_blue w-6 h-6 text-2xl '/>
                    <div className='w-5 h-5 rounded-full bg-lwfs_blue absolute items-center text-center text-sm justify-center text-white -top-2 -right-2'>{cart?.cartItems?.length || 0}</div>
                </div>  
            </div>
        </div>
        
      </div>
      
        <div className="bg-black relative w-48 h-64 rounded-2xl self-center">
            <Image 
                src={imageUrl}
                alt=""
                fill
                className="rounded-2xl object-cover"
            />
        </div>

        <div className="flex flex-col p-4 gap-5">
            <div className="flex flex-col gap-2">
                <h2 className="font-bold">{name}</h2>
                <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative w-5 h-5">
                        <Image 
                            src="/welcome/epees.png"
                            alt="espees"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <span className="font-bold text-xl select-none">
                    {price}
                    </span>
                </div>
                <div className="flex gap-5 px-5">
                    <span onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="flex bg-lwfs_orange rounded-md w-7 h-7 text-white text-center text-2xl font-bold justify-center items-center cursor-pointer select-none">-</span>
                    <span className="flex w-5 justify-center items-center select-none">{Math.max(1, Number(quantity) || 0)}</span>
                    <span onClick={() => setQuantity(prev => prev + 1)} className="flex bg-lwfs_orange rounded-md w-7 h-7 text-white text-center font-bold justify-center items-center cursor-pointer select-none">+</span>
                </div>
            </div>
            </div>
            
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-lg text-lwfs_blue">Description</h1>
                <span>{description}</span>
            </div>

            <div className="flex flex-col gap-3">
                {selectedColor ? <h1 className="font-bold text-lg text-lwfs_blue">Select Color</h1>: ""}
                <div className="flex gap-5">
                    {colors.map((colorObj: { hex: string, name: string }, index: number) => (
                        <div key={index} onClick={() => setSelectedColor(colorObj)} className={`flex w-5 h-5 rounded-full cursor-pointer transition-all  ${selectedColor?.hex === colorObj.hex ? "outline outline-2 outline-offset-2" : ""}`} style={{ backgroundColor: colorObj.hex, outlineColor: colorObj.hex }} 
                        ></div>   
                    ))}
                </div>
                
            </div>
            <div className="flex w-full justify-center items-center mt-10">
                <button 
                    onClick={handleAddToCart}
                    className="flex bg-lwfs_orange w-80 py-2 text-white justify-center items-center text-center rounded-xl font-bold text-xl"
                >
                    Add to Cart
                </button>
            </div>
        </div>
        
      
    </div>
  )
}

// Wrap in Suspense for SSR safety
const ProductDetails = () => (
    <Suspense fallback={<p>Loading product details...</p>}>
        <ProductDetailsComponent />
    </Suspense>
);

export default ProductDetails
