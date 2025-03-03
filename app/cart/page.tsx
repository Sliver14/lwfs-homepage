"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ChevronLeft, CircleX } from "lucide-react";
import { useUserCart } from '../context/UserCartContext';
import axios from 'axios';


const Cart = () => {
    const router = useRouter();
    // const [cart, setCart] = useState({ cartItems: [] }); // Ensure cart is an object
    // const { userId } = useUser();
    const { cart, handleRemoveItem } = useUserCart();
    const [ paymentRef, setPaymentRef ] = useState("");
    const apiUrl = process.env.NEXT_PUBLIC_URL;
    const merchant_wallet = process.env.NEXT_WALLET_ADDRESS;

    useEffect(() => {
        if (paymentRef && typeof window !== "undefined") {
          window.location.href = `https://payment.espees.org/pay/${paymentRef}`;
        }
      }, [paymentRef]);

    const totalCartPrice = cart?.cartItems?.reduce((acc, item) => {
        return acc + (item.product?.price || 0) * item.quantity;
    }, 0) || 0;

    const handleCheckout = async () => {
        try{
            const response = await axios.post("/api/cart/checkout", {
                product_sku: cart.id,
                narration: "Order Payment",
                price: totalCartPrice,
                merchant_wallet: merchant_wallet || "",
                success_url: `${apiUrl}/success`,
                fail_url: `${apiUrl}/fail`,
                user_data: { userId: cart.userId }
            });
              console.log(response.data.payment_ref);
              setPaymentRef(response.data.payment_ref);
              alert("Redirecting to payment...");  
              
    
          }catch(error){
            console.error("Payment error:", error);
            alert("Error Verifying product. Please try again.");
          }
    }

    

  return (
    <div className='flex flex-col min-h-screen w-screen overflow-hidden bg-zinc-100 gap-5'>
        {/* Header */}
      <div className='flex px-5 h-14 w-full items-center bg-white p-2'>     
        <div className='flex w-full items-center'>
            
            <div
                onClick={() => router.back()}
                className= "flex bg-zinc-200 rounded-full h-8 w-8 justify-center items-center  text-lwfs_blue cursor-pointer"
                >
                <ChevronLeft />
            </div>

            <div className='flex font-bold mx-auto text-lwfs_blue text-center'>
            PRODUCT STORE
            </div>

            <div className='flex h-auto justify-end relative items-center cursor-pointer'>
                <div className='flex relative'>
                    <ShoppingCart className='text-lwfs_blue text-2xl '/>
                    <div className='w-5 h-5 rounded-full bg-black absolute items-center text-center text-sm justify-center text-white -top-2 -right-2'>{cart?.cartItems?.length || 0}</div>
                </div>  
            </div>
        </div>
        
      </div>

      {!cart || !cart.cartItems ? <span className="text-center text-gray-500">No items in the cart</span> : 
    <div className='flex flex-col w-screen gap-2'>
    {cart.cartItems.map((item)=>(
        <div key={item.productId} className='flex w-full bg-white gap-1 items-center py-2 px-3'>
            <div className='flex w-full gap-5 p-2 '>
                <div className='flex relative rounded-xl bg-black w-16 h-16'>
                    <Image
                        src={item.product.imageUrl}
                        alt=""
                        layout='fill'
                        objectFit='cover'
                        className='flex rounded-xl'
                    />
                </div>
                <div className='flex flex-col justify-center text-lg font-bold'>
                    <h1>{item.product.name}</h1>
                    <div className='flex items-center gap-2'>
                        <div className="flex relative w-5 h-5 ">
                            <Image 
                            src="/welcome/epees.png"
                            alt="Espees"
                            width={32}  // 8 * 4 = 32px
                            height={32} // 8 * 4 = 32px
                            className="object-cover rounded-full"
                            />
                        </div>
                        <h1 className='font-extrabold'>{(item.product.price * item.quantity).toFixed(2)}</h1>
                    </div>
                    
                </div>
            </div>
            
            <div onClick={()=>handleRemoveItem(item.id)} className=' w-8 h-8 transition transform duration-200 ease-in-out hover:scale-95 bg-red-500 text-white cursor-pointer justify-center items-center text-center p-1'>
                <CircleX />
            </div>

            {/* <div className='flex w-full justify-between text-sm items-center px-3 py-1'>
                <span className='text-red-500'>Remove</span>
                <div>
                    <span>{item.quantity}</span>
                </div>
                
            </div> */}
            
        </div>        
        
    ))}
    
    <button 
        onClick={() => handleCheckout()}  
    
    className='flex w-72 bg-lwfs_orange text-white font-bold py-3 rounded-xl justify-center self-center text-center gap-2 items-center'>
        CHECKOUT 
        <div className="flex relative w-5 h-5 ">
            <Image 
            src="/welcome/epees.png"
            alt="Espees"
            width={32}  // 8 * 4 = 32px
            height={32} // 8 * 4 = 32px
            className="object-cover rounded-full"
            />
        </div> 
        {totalCartPrice.toFixed(2)}
    </button>
    

</div>}

        
        
     
      
    </div>
  )
}

export default Cart
