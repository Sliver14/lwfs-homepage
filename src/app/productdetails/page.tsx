"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useUserCart } from "../../context/UserCartContext";
import { ArrowLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

// Define Product type based on Prisma schema
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

const ProductDetailsComponent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const productId = searchParams.get("id") || "";
    const [ quantity, setQuantity ] = useState<number>(1); 
    const { userId } = useUser(); // Get user ID from context
    const { cart, fetchCart } = useUserCart();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [productLoading, setProductLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch product data from API
    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) {
                setError("No product ID provided");
                setProductLoading(false);
                return;
            }

            try {
                setProductLoading(true);
                const response = await axios.get(`/api/store/products/${productId}`);
                setProduct(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError("Failed to load product details");
            } finally {
                setProductLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = async () => {
    setLoading(true);
    if (!userId) {
        console.error("User ID is missing");
        return;
    }

    try{
        // Add the item to cart multiple times based on quantity
        for (let i = 0; i < quantity; i++) {
            await axios.post("/api/cart", {productId}, { withCredentials: true });
        }
        console.log(`Added ${quantity} item(s) to cart`);
        await fetchCart();
    }catch(error){
        console.error("Error adding to cart:", error);
    }finally{
        setLoading(false);
    }
   }

  if (productLoading) {
    return (
      <div className="flex relative flex-col bg-gray-100 w-screen pt-16 h-full">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex relative flex-col bg-gray-100 w-screen pt-16 h-full">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || "Product not found"}</p>
            <button 
              onClick={() => router.back()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex relative flex-col bg-gray-100 w-screen pt-16 h-full">
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
                    <ShoppingCartIcon className='text-blue-600 w-6 h-6 text-2xl '/>
                    <div className='w-5 h-5 rounded-full bg-blue-600 absolute items-center text-center text-sm justify-center text-white -top-2 -right-2'>
                        {cart?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0}
                    </div>
                </div>  
            </div>
        </div>
        
      </div>
      
        <div className="bg-gray-200 relative w-48 h-64 rounded-2xl self-center overflow-hidden">
            <Image 
                src={product.imageUrl}
                alt={product.name}
                fill
                className="rounded-2xl object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = "https://placehold.co/400x600/ccc/000?text=Image+Unavailable";
                }}
            />
        </div>

        <div className="flex flex-col p-4 gap-5">
            <div className="flex flex-col gap-2">
                <h2 className="font-bold">{product.name}</h2>
                <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative w-5 h-5">
                        <Image 
                            src="/welcome/epees.png"
                            alt="espees"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="font-bold text-xl select-none">
                    {product.price}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="flex bg-orange-500 rounded-md w-8 h-8 text-white text-center text-xl font-bold justify-center items-center cursor-pointer select-none hover:bg-orange-600 transition-colors"
                    >
                        -
                    </button>
                    <span className="flex w-8 justify-center items-center select-none text-lg font-semibold">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="flex bg-orange-500 rounded-md w-8 h-8 text-white text-center text-xl font-bold justify-center items-center cursor-pointer select-none hover:bg-orange-600 transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>
            </div>
            
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-lg text-blue-600">Description</h1>
                <span className="text-gray-700 leading-relaxed">{product.description}</span>
            </div>
            <div className="flex w-full justify-center items-center mt-10">
                <button 
                    onClick={handleAddToCart} disabled={loading}
                    className={`flex bg-orange-500 w-80 py-2 ${loading && "opacity-50 cursor-not-allowed"} text-white justify-center items-center text-center rounded-xl font-bold text-xl`}
                >
                    {loading ? "Adding to cart.....": "Add to Cart"}
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
