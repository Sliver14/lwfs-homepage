"use client"; // Ensure it's a client component

import { useState, useEffect } from "react";
// import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useUserCart } from "../context/UserCartContext";


type Item = {
  name: string;
  imageUrl: string;
  id: string;
  description: string;
  price: number;
  colors: { color: string }[]; // ✅ Array of objects
};



function Store() {
  const router = useRouter();
  const { cart } = useUserCart();
  // const [ paymentRef, setPaymentRef ] = useState("");
  const [ productList, setProductList ] = useState<Item[]>([]);

  useEffect(()=>{
    const fetchProduct = async () => {
      try{
        const response = await axios.get("/api/products/productlist");
        setProductList(response.data.data);
        // console.log(response.data.data)
      }catch(error){
        console.error('Error fetching products:', error);
      }
    }
  
    fetchProduct();
    
  },[])
  

  // const Trending = [
  //   {
  //     imageUrl: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1741434671/tnh9p1kw8jigciodqoll.jpg",
  //     id: "lwfslyd1",
  //     description: "Student lanyard",
  //     price: 1,
  //     colors: [
  //       {color: "#000000"},
  //       {color: "#ef2361"},
  //       {color: "#08690f"},
  //       {color: "#693808"},
  //       {color: "#10b6b0"},
  //     ]
  //   },
  //   {
  //     imageUrl: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1741434671/mzfyxc1wbhohhhxakuhd.jpg",
  //     id: "lwfslyd2",
  //     description: "Student lanyard",
  //     price: 1,
  //     colors: [
  //       {color: "#000000"},
  //       {color: "#ef2361"},
  //       {color: "#08690f"},
  //       {color: "#693808"},
  //       {color: "#10b6b0"},
  //     ]
  //   },
  //   {
  //     imageUrl: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1741434670/acdqvnn3bezfubakbbqp.jpg",
  //     id: "lwfslyd3",
  //     description: "Student lanyard",
  //     price: 1,
  //     colors: [
  //       {color: "#000000"},
  //       {color: "#ef2361"},
  //       {color: "#08690f"},
  //       {color: "#693808"},
  //       {color: "#10b6b0"},
  //     ]
  //   },
  //   {
  //     imageUrl: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1741434671/zbf23duwhmmndx1cazdc.jpg",
  //     description: "Student lanyard",
  //     id: "lwfslyd4",
  //     price: 1,
  //     colors: [
  //       {color: "#000000"},
  //       {color: "#ef2361"},
  //       {color: "#08690f"},
  //       {color: "#693808"},
  //       {color: "#10b6b0"},
  //     ]
  //   },
  //   {
  //     imageUrl: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1741434670/t8oxycxgzkgughti0lfm.jpg",
  //     id: "lwfslyd5",
  //     description: "Student lanyard",
  //     price: 1,
  //     colors: [
  //       {color: "#000000"},
  //       {color: "#ef2361"},
  //       {color: "#08690f"},
  //       {color: "#693808"},
  //       {color: "#10b6b0"},
  //     ]
  //   },
  // ]

  // const handlePayment = async (item: Item) => {
  //     try{
  //       const response = await axios.post("/api/payment", {
  //         product_sku: item.product_sku,
  //         narration: item.narration,
  //         price: item.price,
  //         merchant_wallet: item.merchant_wallet,
  //         success_url: item.success_url,
  //         fail_url: item.fail_url,
  //         user_data: item.user_data,
  //       });
  //         console.log(response.data.payment_ref);
  //         setPaymentRef(response.data.payment_ref);
  //         alert("Redirecting to payment...");  

  //     }catch(error){
  //       console.error("Payment error:", error);
  //       alert("Error Verifying product. Please try again.");
  //     }
  //   }

  const handleSelect = (item: Item) => {
      // Encode the video data in the query params
      const encodedColors = encodeURIComponent(JSON.stringify(item.colors));
      router.push(`/productdetails?id=${item.id}&name=${encodeURIComponent(item.name)}&description=${encodeURIComponent(item.description)}&imageUrl=${encodeURIComponent(item.imageUrl)}&price=${encodeURIComponent(item.price)}&colors=${encodedColors}`);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-100 gap-5 py-16 md:flex-row w-screen overflow-hidden lg:hidden">
       {/* Header */}
       <div className='flex fixed top-0 px-5 bg-white h-14 w-full items-center z-20'>     
        <div className='flex w-full items-center '>
            
            {/* <div
                onClick={() => router.back()}
                className="hover:bg-gray-100 rounded-full p-2"
            >
                <ChevronLeft />
            </div> */}

            <div className='flex font-bold mx-auto '>
            LWFS Store
            </div>

            <div onClick={()=> router.push("/cart")} className='flex h-auto justify-end relative items-center cursor-pointer'>
                <div className='flex relative'>
                    <ShoppingCartIcon className='text-lwfs_blue w-6 h-6 text-2xl '/>
                    <div className='w-5 h-5 rounded-full bg-lwfs_blue absolute items-center text-center text-sm justify-center text-white -top-2 -right-2'>{cart?.cartItems?.length || 0}</div>
                </div>  
            </div>
        </div>
        
      </div>
      
      {/* Trending Product */}
      {/* <div className="relative flex items-center bg-white p-2 w-full h-auto overflow-x-auto ">
        <div className="flex gap-2">
          {Trending.map((item) => (
            <div onClick={() => handleSelect(item)} key={item.id} className="relative w-24 h-32 shadow-lg rounded-xl flex-shrink-0 cursor-pointer">
              <Image 
                src={item.imageUrl} 
                alt="" 
                fill               
                className='h-full w-full object-cover rounded-xl'
              />
            </div>
          ))}
        </div>
      </div> */}

      <div className="flex justify-between bg-white px-5 py-2 gap-5">
        <h1 className="text-lwfs_blue font-semibold text-base">
          CATEGORIES
        </h1>
        <h1 className="font-bold">
          Products
        </h1>
      </div>

      <div className="grid grid-cols-2 p-2 gap-2 w-screen">
        {productList.map((item)=>(
          <div onClick={() => handleSelect(item)} key={item.id} className="flex cursor-pointer flex-col w-48 h-60 rounded-sm bg-white p-3">
            <div className="w-full h-[90%] rounded-md transition transform duration-300 ease-out lg:hover:scale-105">
              <Image 
                src={item.imageUrl} 
                alt="" 
                fill
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col p-1">
              <h1 className="text-wrap">{item.name}</h1>
              <div className="flex gap-1 items-center w-full">
                {/* espees icon */}
                <div className="flex relative w-3.5 h-3.5 ">
                  <Image 
                    src="/welcome/epees.png"
                    alt="Espees"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <span className="font-semibold">{item.price}</span>
              </div>
            </div>
          </div>
         ))}   
      </div>
         

    </div>
  )
}

export default Store
