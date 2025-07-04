// src/context/UserCartContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string;
    };
}

interface Cart {
    cartItems: CartItem[];
}

interface UserCartContextType {
    cart: Cart;
    fetchCart: () => Promise<void>;
    handleRemoveItem: (itemId: string) => Promise<void>;
    addToCart: (productId: string) => Promise<void>;
    increaseQuantity: (productId: string) => Promise<void>;
    decreaseQuantity: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
}

const UserCartContext = createContext<UserCartContextType | undefined>(undefined);

export const UserCartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart>({ cartItems: [] });
    const { userId } = useUser();

    const fetchCart = useCallback(async () => {
        if (!userId) return;
        try {
            const response = await axios.get("/api/cart", { withCredentials: true });
            setCart({ cartItems: response.data });
            console.log("Cart fetched successfully:", response.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Error fetching user cart (Axios):", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error fetching user cart (General):", error.message);
            } else {
                console.error("Error fetching user cart (Unknown):", error);
            }
        }
    }, [userId]);

    const addToCart = useCallback(async (productId: string) => {
        if (!userId) return;
        try {
            await axios.post("/api/cart", { productId }, { withCredentials: true });
            await fetchCart(); // Refresh cart after adding item
            console.log("Item added to cart successfully");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Error adding item to cart (Axios):", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error adding item to cart (General):", error.message);
            } else {
                console.error("Error adding item to cart (Unknown):", error);
            }
        }
    }, [userId, fetchCart]);

    const handleRemoveItem = async (itemId: string) => {
        try {
            await axios.delete("/api/cart/remove", { 
                data: { cartItemId: itemId },
                withCredentials: true 
            });
            setCart((prevCart) => ({
                ...prevCart,
                cartItems: prevCart.cartItems.filter((item) => item.id !== itemId),
            }));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Error removing item (Axios):", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error removing item (General):", error.message);
            } else {
                console.error("Error removing item (Unknown):", error);
            }
        }
    };

    const increaseQuantity = async (productId: string) => {
        if (!userId) return;
        try {
            await axios.patch("/api/cart/increase", { productId }, { withCredentials: true });
            await fetchCart(); // Refresh cart after increasing quantity
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Error increasing quantity (Axios):", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error increasing quantity (General):", error.message);
            } else {
                console.error("Error increasing quantity (Unknown):", error);
            }
        }
    };

    const decreaseQuantity = async (productId: string) => {
        if (!userId) return;
        try {
            await axios.patch("/api/cart/decrease", { productId }, { withCredentials: true });
            await fetchCart(); // Refresh cart after decreasing quantity
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Error decreasing quantity (Axios):", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error decreasing quantity (General):", error.message);
            } else {
                console.error("Error decreasing quantity (Unknown):", error);
            }
        }
    };

    const clearCart = async () => {
        if (!userId) return;
        try {
            await axios.delete("/api/cart/clear", { withCredentials: true });
            setCart({ cartItems: [] });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Error clearing cart (Axios):", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error clearing cart (General):", error.message);
            } else {
                console.error("Error clearing cart (Unknown):", error);
            }
        }
    };

    useEffect(() => {
        if (userId) {
            fetchCart();
        }
    }, [userId, fetchCart]);

    return (
        <UserCartContext.Provider value={{ 
            cart, 
            fetchCart, 
            handleRemoveItem, 
            addToCart, 
            increaseQuantity, 
            decreaseQuantity, 
            clearCart 
        }}>
            {children}
        </UserCartContext.Provider>
    );
};

export const useUserCart = () => {
    const context = useContext(UserCartContext);
    if (!context) {
        throw new Error("useUserCart must be used within a UserCartProvider");
    }
    return context;
};