"use client";
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { CircleX } from "lucide-react";
import { useUserCart } from '../context/UserCartContext';
import { usePayment } from '../context/PaymentContext';
import { ArrowLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

// Define the CartItem type
interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    product: {
      name: string;
      price: number;
      imageUrl: string;
    };
  }
  
  // Define the Cart type
  interface Cart {
    id: number;
    userId: string;
    cartItems: CartItem[];
  }

const Cart = () => {
    const router = useRouter();
    const { cart, handleRemoveItem } = useUserCart();
    const { paymentRef, handleCheckout } = usePayment();

    useEffect(() => {
        if (paymentRef && typeof window !== "undefined") {
          window.location.href = `https://payment.espees.org/pay/${paymentRef}`;
        }
      }, [paymentRef]);

    const totalCartPrice:number = 
        cart?.cartItems?.reduce((acc, item) => {
        return acc + (item.product?.price || 0) * item.quantity;
    }, 0) || 0; 

  return (
    <div className='flex flex-col min-h-screen w-screen overflow-hidden bg-zinc-100 gap-5'>
        {/* Header */}
      <div className='flex px-5 h-14 w-full items-center bg-white p-2'>     
        <div className='flex w-full items-center'>
            
            <div
                onClick={() => router.back()}
                className= "flex hover:bg-gray-100 rounded-full h-8 w-8 justify-center items-center   cursor-pointer"
                >
                <ArrowLeftIcon className="w-5 h-5" />
            </div>

            <div className='flex font-bold text-xl mx-auto  text-center'>
            Cart
            </div>

            <div className='flex h-auto justify-end relative items-center cursor-pointer'>
                <div className='flex relative'>
                <ShoppingCartIcon className='text-lwfs_blue w-6 h-6 text-2xl '/>
                    <div className='w-5 h-5 rounded-full bg-lwfs_blue absolute items-center text-center text-sm justify-center text-white -top-2 -right-2'>{cart?.cartItems?.length || 0}</div>
                </div>  
            </div>
        </div>
        
      </div>

      {!cart || cart.cartItems.length === 0 ? 
        <span className="text-center text-gray-500">
            No items in the cart
        </span> 
        : 
        <div className='flex flex-col w-screen gap-2'>
            <div className='flex items-center justify-between px-5'>
                <span className='font-medium'>Subtotal</span>
                <span className='flex justify-items-center items-center gap-2'>
                    <div className="flex relative w-5 h-5 ">
                        <Image 
                        src="/welcome/epees.png"
                        alt="Espees"
                        width={20}  // 8 * 4 = 32px
                        height={20} // 8 * 4 = 32px
                        className="object-cover rounded-full"
                        />
                    </div> 
                    <span>{totalCartPrice.toFixed(2)}</span>
                    
                </span>
            </div>
        {cart.cartItems.map((item)=>(
            <div key={item.productId} className='flex w-full bg-white gap-1 items-center py-2 px-3'>
                <div className='flex w-full gap-5 p-2 '>
                    <div className='flex flex-col gap-2'>
                        <div className='flex relative rounded-xl bg-black w-16 h-16'>
                            <Image
                                src={item.product.imageUrl}
                                alt=""
                                layout='fill'
                                objectFit='cover'
                                className='flex rounded-xl'
                            />
                            
                        </div>
                        <span onClick={()=>handleRemoveItem(item.id)} className='text-red-500 text-sm' >Remove item</span>
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
                
                {/* <div onClick={()=>handleRemoveItem(item.id)} className=' w-8 h-8 transition transform duration-200 ease-in-out hover:scale-95 bg-red-500 text-white cursor-pointer justify-center items-center text-center p-1'>
                    <CircleX />
                </div> */}
                
            </div>        
            
        ))}
    
    <button 
        onClick={() => handleCheckout(cart as Cart, totalCartPrice)}  
    
    className='flex w-72 bg-lwfs_orange text-white font-bold py-3 rounded-xl justify-center self-center text-center gap-2 items-center'>
        Checkout 
        
    </button>
    

</div>}

    </div>
  )
}

export default Cart
