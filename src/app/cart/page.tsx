"use client";
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { CircleX } from "lucide-react";
import { useUserCart } from '../../context/UserCartContext';
import { usePayment } from '../../context/PaymentContext';
import { ArrowLeftIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/solid";

// Define the CartItem type
interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: {
      name: string;
      price: number;
      imageUrl: string;
    };
  }
  
  // Define the Cart type
  interface Cart {
    cartItems: CartItem[];
  }

const Cart = () => {
    const router = useRouter();
    const { cart, handleRemoveItem, increaseQuantity, decreaseQuantity, clearCart } = useUserCart();
    const { paymentRef, handleCheckout } = usePayment();
    const [loading, setLoading] = React.useState(false);
    const [removingItem, setRemovingItem] = React.useState<string | null>(null);

    useEffect(() => {
        if (paymentRef && typeof window !== "undefined") {
          window.location.href = `https://payment.espees.org/pay/${paymentRef}`;
        }
      }, [paymentRef]);

    const totalCartPrice:number = 
        cart?.cartItems?.reduce((acc, item) => {
        return acc + (item.product?.price || 0) * item.quantity;
    }, 0) || 0;

    const handleRemoveItemWithLoading = async (itemId: string) => {
        setRemovingItem(itemId);
        try {
            await handleRemoveItem(itemId);
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setRemovingItem(null);
        }
    };

    const handleQuantityChange = async (productId: string, action: 'increase' | 'decrease') => {
        setLoading(true);
        try {
            if (action === 'increase') {
                await increaseQuantity(productId);
            } else {
                await decreaseQuantity(productId);
            }
        } catch (error) {
            console.error(`Error ${action}ing quantity:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearCartWithLoading = async () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            setLoading(true);
            try {
                await clearCart();
            } catch (error) {
                console.error('Error clearing cart:', error);
            } finally {
                setLoading(false);
            }
        }
    }; 

  return (
    <div className='flex flex-col min-h-screen bg-zinc-100 gap-5'>
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
                <ShoppingCartIcon className='text-blue-600 w-6 h-6 text-2xl '/>
                    <div className='w-5 h-5 rounded-full bg-blue-600 absolute items-center text-center text-sm justify-center text-white -top-2 -right-2'>
                        {cart?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0}
                    </div>
                </div>  
            </div>
        </div>
        
      </div>

      {!cart || cart.cartItems.length === 0 ? 
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <div className="text-center text-gray-500">
                <ShoppingCartIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-400">Add some items to get started!</p>
            </div>
            <button 
                onClick={() => router.push('/store')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
                Continue Shopping
            </button>
        </div>
        : 
        <div className='flex flex-col w-full gap-2 px-4'>
            <div className='flex items-center justify-between'>
                <span className='font-medium'>Subtotal</span>
                <span className='flex justify-items-center items-center gap-2'>
                    <div className="flex relative w-5 h-5 ">
                        <Image 
                        src="/welcome/epees.png"
                        alt="Espees"
                        width={20}
                        height={20}
                        className="object-cover rounded-full"
                        />
                    </div> 
                    <span>{totalCartPrice.toFixed(2)}</span>
                    
                </span>
            </div>
        {cart.cartItems.map((item)=>(
            <div key={item.id} className='flex w-full bg-white gap-1 items-center py-2 px-3 shadow-sm hover:shadow-md transition-shadow rounded-lg'>
                <div className='flex w-full gap-3 p-2 '>
                    <div className='flex flex-col gap-2'>
                        <div className='flex relative rounded-xl bg-black w-16 h-16 overflow-hidden flex-shrink-0'>
                            <Image
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                fill
                                className='flex rounded-xl object-cover'
                                onError={(e) => {
                                    (e.target as HTMLImageElement).onerror = null;
                                    (e.target as HTMLImageElement).src = "https://placehold.co/64x64/ccc/000?text=Image";
                                }}
                            />
                        </div>
                    </div>
                    
                    <div className='flex flex-col justify-center text-lg font-bold flex-1 min-w-0'>
                        <h1 className='text-gray-900 truncate'>{item.product.name}</h1>
                        <div className='flex items-center gap-2'>
                            <div className="flex relative w-5 h-5 flex-shrink-0">
                                <Image 
                                src="/welcome/epees.png"
                                alt="Espees"
                                width={20}
                                height={20}
                                className="object-cover rounded-full"
                                />
                            </div>
                            <h1 className='font-extrabold text-blue-600'>{(item.product.price * item.quantity).toFixed(2)}</h1>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className='flex items-center gap-3 mt-2'>
                            <button 
                                onClick={() => handleQuantityChange(item.productId, 'decrease')}
                                disabled={loading}
                                className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0'
                            >
                                -
                            </button>
                            <span className='text-lg font-semibold min-w-[2rem] text-center'>{item.quantity}</span>
                            <button 
                                onClick={() => handleQuantityChange(item.productId, 'increase')}
                                disabled={loading}
                                className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0'
                            >
                                +
                            </button>
                        </div>
                    </div>
                    
                    <div className='flex flex-col items-end gap-2 flex-shrink-0'>
                        <button 
                            onClick={() => handleRemoveItemWithLoading(item.id)}
                            disabled={removingItem === item.id}
                            className='flex items-center gap-1 text-red-500 text-sm cursor-pointer hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-lg hover:bg-red-50 transition-colors border border-red-200 hover:border-red-300'
                        >
                            <TrashIcon className="w-4 h-4" />
                            {removingItem === item.id ? 'Removing...' : 'Remove'}
                        </button>
                    </div>
                </div>
            </div>        
        ))}
    
    <div className='flex flex-col gap-3 w-full max-w-sm mx-auto'>
        <button 
            onClick={() => handleCheckout(cart, totalCartPrice)}  
            disabled={loading || cart.cartItems.length === 0}
            className='flex w-full bg-orange-500 text-white font-bold py-3 rounded-xl justify-center text-center gap-2 items-center hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
            {loading ? 'Processing...' : 'Checkout'}
        </button>
        
        <div className='flex gap-2'>
            <button 
                onClick={() => router.push('/store')}
                className='flex-1 bg-gray-500 text-white font-bold py-3 rounded-xl justify-center text-center gap-2 items-center hover:bg-gray-600 transition-colors'
            >
                Continue Shopping
            </button>
            
            <button 
                onClick={handleClearCartWithLoading}  
                disabled={loading || cart.cartItems.length === 0}
                className='flex-1 bg-red-500 text-white font-bold py-3 rounded-xl justify-center text-center gap-2 items-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                {loading ? 'Clearing...' : 'Clear Cart'}
            </button>
        </div>
    </div>
    

</div>}

    </div>
  )
}

export default Cart
