"use client";

import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Removed Next.js useRouter
import axios from "axios";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

// Define a placeholder for Item as useUserCart is not available
type Item = {
    name: string;
    imageUrl: string;
    id: string;
    description: string;
    price: number;
    colors: { color: string }[];
};

function Store() {
    // Replaced useRouter with a simple navigation function
    const navigateTo = (path: string) => {
        window.location.href = path;
    };

    // Simulate cart for demonstration, as context is not available
    const [cartItemCount, setCartItemCount] = useState(3); // Placeholder value for cart items

    const [productList, setProductList] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const [error, setError] = useState<string | null>(null); // Add error state

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/products/productlist");
                setProductList(response.data.data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    const handleSelect = (item: Item) => {
        // Encode the video data in the query params
        const encodedColors = encodeURIComponent(JSON.stringify(item.colors));
        navigateTo(`/productdetails?id=${item.id}&name=${encodeURIComponent(item.name)}&description=${encodeURIComponent(item.description)}&imageUrl=${encodeURIComponent(item.imageUrl)}&price=${encodeURIComponent(item.price)}&colors=${encodedColors}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
            {/* Header */}
            <header className='fixed top-0 left-0 w-full bg-white shadow-md z-20'>
                <div className='flex items-center justify-between h-16 px-4 sm:px-6 md:px-8 lg:px-10'>
                    <div className='flex-grow text-center lg:text-left'>
                        <h1 className='text-xl sm:text-2xl font-bold text-blue-800'>
                            LWFS Store
                        </h1>
                    </div>

                    <div onClick={() => navigateTo("/cart")} className='relative cursor-pointer hover:scale-105 transition-transform duration-200'>
                        <ShoppingCartIcon className='text-blue-800 w-7 h-7 sm:w-8 sm:h-8' aria-label="Shopping Cart" />
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white'>
                            {cartItemCount} {/* Using simulated cart item count */}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content Area - adjusted padding-top for fixed header */}
            <main className="flex flex-col flex-grow pt-20 pb-8 px-4 sm:px-6 md:px-8 lg:px-10">

                {/* Categories & Products Header */}
                <div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-4 mb-6">
                    <h2 className="text-blue-800 font-semibold text-lg sm:text-xl">
                        CATEGORIES
                    </h2>
                    <h2 className="font-bold text-lg sm:text-xl text-gray-900">
                        Products
                    </h2>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64 text-lg text-gray-600">
                        Loading products...
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-64 text-lg text-red-600">
                        {error}
                    </div>
                ) : productList.length === 0 ? (
                    <div className="flex justify-center items-center h-64 text-lg text-gray-600">
                        No products found.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                        {productList.map((item) => (
                            <div
                                onClick={() => handleSelect(item)}
                                key={item.id}
                                className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 ease-out hover:scale-[1.03]"
                            >
                                <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-t-lg overflow-hidden">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        // Fallback for broken images
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).onerror = null;
                                            (e.target as HTMLImageElement).src = "https://placehold.co/400x400/ccc/000?text=Image+Unavailable";
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col p-3 flex-grow">
                                    <h3 className="text-base font-semibold text-gray-900 mb-1 leading-tight line-clamp-2">
                                        {item.name}
                                    </h3>
                                    <div className="flex items-center gap-1 mt-auto">
                                        {/* Espees icon - assuming it's a small image file */}
                                        <img
                                            src="/welcome/epees.png"
                                            alt="Espees"
                                            className="w-4 h-4 object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).onerror = null;
                                                (e.target as HTMLImageElement).src = "https://placehold.co/16x16/ccc/000?text=E"; // Placeholder for icon
                                            }}
                                        />
                                        <span className="font-bold text-blue-700 text-lg">{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Store;