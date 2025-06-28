// src/context/UserCartContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import axios from "axios"; // Ensure AxiosError is imported here
import { useUser } from "./UserContext"; // Assuming this is correct import for your UserContext

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

interface Cart {
    cartItems: CartItem[];
}

interface UserCartContextType {
    cart: Cart;
    fetchCart: () => Promise<void>;
    handleRemoveItem: (itemId: number) => Promise<void>;
}

const UserCartContext = createContext<UserCartContextType | undefined>(undefined);

export const UserCartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart>({ cartItems: [] });
    const { userId } = useUser();

    const fetchCart = useCallback(async () => {
        if (!userId) return;
        try {
            // Your API for fetching cart items:
            // If /api/cart GET route expects userId from the header (recommended),
            // you'd need to ensure axios sends that header here.
            // axios.get("/api/cart", { headers: { Authorization: `Bearer ${YOUR_TOKEN_HERE}` } });
            // For now, keeping as POST to match your code, assuming your API expects it this way
            const response = await axios.post("/api/cart", { userId });
            setCart(response.data);
            console.log({"loggedin userCart": response.data});
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) { // This uses AxiosError type
                console.error("Error fetching user cart (Axios):", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error fetching user cart (General):", error.message);
            } else {
                console.error("Error fetching user cart (Unknown):", error);
            }
        }
    }, [userId]);

    const handleRemoveItem = async (itemId: number) => {
        try {
            await axios.delete("/api/cart/remove", { data: { cartItemId: itemId } });
            setCart((prevCart) => ({
                ...prevCart,
                cartItems: prevCart.cartItems.filter((item) => item.id !== itemId),
            }));
        } catch (error: unknown) { // This uses unknown type
            if (axios.isAxiosError(error)) { // This uses AxiosError type
                console.error("Error removing item (Axios):", error.response?.data || error.message);
            } else if (error instanceof Error) {
                console.error("Error removing item (General):", error.message);
            } else {
                console.error("Error removing item (Unknown):", error);
            }
        }
    };

    useEffect(() => {
        if (userId) {
            fetchCart();
        }
    }, [userId, fetchCart]);

    return (
        <UserCartContext.Provider value={{ cart, fetchCart, handleRemoveItem }}>
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