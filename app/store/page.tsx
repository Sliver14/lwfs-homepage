"use client"; // Ensure it's a client component

import { useState, useEffect } from "react";
// import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  

  const Trending = [
    {
      img_url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1738850381/kraoewzabh80yttg1t4x.png",
      product_id: "lwfslyd1",
      narration: "Student lanyard",
      price: 1,
      colors: [
        {color: "#000000"},
        {color: "#ef2361"},
        {color: "#08690f"},
        {color: "#693808"},
        {color: "#10b6b0"},
      ]
    },

    {
      img_url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1738850381/kraoewzabh80yttg1t4x.png",
      product_id: "lwfslyd3",
      narration: "Student lanyard",
      price: 1,
      colors: [
        {color: "#000000"},
        {color: "#ef2361"},
        {color: "#08690f"},
        {color: "#693808"},
        {color: "#10b6b0"},
      ]
    },
    
    {
      img_url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1738850381/kraoewzabh80yttg1t4x.png",
      product_id: "lwfslyd9",
      narration: "Student lanyard",
      price: 1,
      colors: [
        {color: "#000000"},
        {color: "#ef2361"},
        {color: "#08690f"},
        {color: "#693808"},
        {color: "#10b6b0"},
      ]
    },
  ]

  // const StoreProducts:Item[] = [
  //   {
  //     img_url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1738850381/kraoewzabh80yttg1t4x.png",
  //     product_id: "lwfslyd1",
  //     narration: "Student lanyard",
  //     price: 0.1,
  //     colors: [
  //       {color: "#000000"},
  //       {color: "#ef2361"},
  //       {color: "#08690f"},
  //       {color: "#693808"},
  //       {color: "#10b6b0"},
  //     ]
  //   },
  //   {
  //     img_url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1738850381/kraoewzabh80yttg1t4x.png",
  //     product_id: "lwfslyd2",
  //     narration: "Student lanyard",
  //     price: 0.2,
  //     colors: [
  //       {color: "#000000"},
  //       {color: "#ef2361"},
  //       {color: "#08690f"},
  //       {color: "#693808"},
  //       {color: "#10b6b0"},
  //     ]
  //   },
  //   {
  //     img_url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1738850381/kraoewzabh80yttg1t4x.png",
  //     product_id: "lwfslyd3",
  //     narration: "Student lanyard",
  //     price: 0.3,
  //     colors: [
  //       {color: "#000000"},
  //       {color: "#ef2361"},
  //       {color: "#08690f"},
  //       {color: "#693808"},
  //       {color: "#10b6b0"},
  //     ]
  //   },
  //   {
  //     img_url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1738850381/kraoewzabh80yttg1t4x.png",
  //     product_id: "lwfslyd4",
  //     narration: "Student lanyard",
  //     price: 0.4,
  //     colors: [
  //       {color: "#000000"},
  //       {color: "#ef2361"},
  //       {color: "#08690f"},
  //       {color: "#693808"},
  //       {color: "#10b6b0"},
  //     ]
  //   },
  //   {
  //     img_url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1738850381/kraoewzabh80yttg1t4x.png",
  //     product_id: "lwfslyd5",
  //     narration: "Student lanyard",
  //     price: 0.5,
  //     colors: [
  //       {color: "#000000"},
  //       {color: "#ef2361"},
  //       {color: "#08690f"},
  //       {color: "#693808"},
  //       {color: "#10b6b0"},
  //     ]
  //   },
  //   {
  //     img_url: "https://res.cloudinary.com/dfi8bpolg/image/upload/v1738850381/kraoewzabh80yttg1t4x.png",
  //     product_id: "lwfslyd",
  //     narration: "Student lanyard",
  //     price: 0.6,
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
    <div className="flex flex-col h-full bg-zinc-100 gap-5 py-16 md:flex-row w-screen overflow-hidden">
      {/* Header */}
      {/* <div className="grid grid-cols-3 w-screen p-2 h-16 fixed top-0 z-20 shadow-md justify-center items-center">
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
        <div>
      </div> */}
      {/* Trending Product */}
      <div className="relative flex items-center bg-white p-2 w-full h-auto overflow-x-auto ">
        <div className="flex gap-2">
          {Trending.map((item) => (
            <div key={item.product_id} className="relative w-52 h-40 shadow-lg flex-shrink-0 cursor-pointer">
              <Image 
                src={item.img_url} 
                alt="" 
                fill               
                className='h-full w-full object-cover rounded-xl'
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between bg-white px-5 py-2 gap-5">
        <h1 className="text-lwfs_blue font-bold text-lg">
          CATEGORIES
        </h1>
        <h1 className="font-bold">
          Products
        </h1>
      </div>

      <div className="grid grid-cols-2 p-2 gap-2 w-screen">
        {productList.map((item)=>(
          <div onClick={() => handleSelect(item)} key={item.id} className="flex cursor-pointer flex-col w-48 h-48 rounded-sm bg-white p-2">
            <div className="w-full h-full rounded-md transition transform duration-300 ease-out lg:hover:scale-105">
              <Image src={item.imageUrl} alt="" height={400} width={350} className="w-full h-full object-cover rounded-md"/>
            </div>
            <div className="flex flex-col p-1">
              <h1 className="text-lg text-wrap">{item.name}</h1>
              <div className="flex gap-1 items-center w-full">
                <div className="flex relative w-5 h-5 ">
                  <Image 
                    src="/welcome/epees.png"
                    alt="Espees"
                    width={32}  // 8 * 4 = 32px
                    height={32} // 8 * 4 = 32px
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
