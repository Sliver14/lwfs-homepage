"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

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

    // ✅ useCallback ensures fetchCart is stable and doesn't trigger unnecessary re-renders
    const fetchCart = useCallback(async () => {
        if (!userId) return;
        try {
            const response = await axios.post("/api/cart", { userId });
            setCart(response.data);
            console.log({"loggedin userCart": response.data});
        } catch (error) {
            console.error("Error fetching user cart:", error);
        }
    }, [userId]);

    // ✅ Removes an item from the cart and updates state
    const handleRemoveItem = async (itemId: number) => {
        try {
            await axios.delete("/api/cart/remove", { data: { cartItemId: itemId } });
            setCart((prevCart) => ({
                ...prevCart,
                cartItems: prevCart.cartItems.filter((item) => item.id !== itemId),
            }));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    // ✅ Fetch cart when userId changes
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

// ✅ Custom hook to use the cart context safely
export const useUserCart = () => {
    const context = useContext(UserCartContext);
    if (!context) {
        throw new Error("useUserCart must be used within a UserCartProvider");
    }
    return context;
};




// "use client";

// import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
// import axios from "axios";
// import { useUser } from "./UserContext";

// interface CartItem {
//     id: number;
//     productId: number;
//     quantity: number;
//     product: {
//         name: string;
//         price: number;
//         imageUrl: string;
//     };
// }

// interface Cart {
//     cartItems: CartItem[];
// }

// interface UserCartContextType {
//     cart: Cart;
//     fetchCart: () => Promise<void>;
//     handleRemoveItem: (itemId: number) => Promise<void>;
// }

// const UserCartContext = createContext<UserCartContextType | undefined>(undefined);

// export const UserCartProvider = ({ children }: { children: ReactNode }) => {
//     const [cart, setCart] = useState<Cart>({ cartItems: [] });
    
//     const { userId } = useUser();

//     // ✅ Wrap fetchCart in useCallback to prevent unnecessary re-creations
//     const fetchCart = useCallback(async () => {
//         if (!userId) return;

//         try {
//             const response = await axios.post("/api/cart", { userId });
//             setCart(response.data);
//             console.log(response.data);
//         } catch (error) {
//             console.error("Error fetching user cart:", error);
//         }
//     }, [userId]);

//     const handleRemoveItem = async (itemId: number) => {
//         try {
//             await axios.delete("/api/cart/remove", { data: { cartItemId: itemId } });
//             setCart((prevCart) => ({
//                 ...prevCart,
//                 cartItems: prevCart.cartItems.filter((item) => item.id !== itemId),
//             }));
//         } catch (error) {
//             console.error("Error removing item:", error);
//         }
//     };

//     // ✅ Only fetch when userId is set
//     useEffect(() => {
//         if (userId) {
//             fetchCart();
//         }
//     }, [userId, fetchCart]);

//     return (
//         <UserCartContext.Provider value={{ cart, fetchCart, handleRemoveItem }}>
//             {children}
//         </UserCartContext.Provider>
//     );
// };

// export const useUserCart = () => {
//     const context = useContext(UserCartContext);
//     if (!context) {
//         throw new Error("useUserCart must be used within a UserCartProvider");
//     }
//     return context;
// };


// "use client";

// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import axios from "axios";
// import { useUser } from "./UserContext";

// interface CartItem {
//     id: number;
//     productId: number;
//     quantity: number;
//     product: {
//       name: string;
//       price: number;
//       imageUrl: string;
//     };
//   }
  
//   interface Cart {
//     cartItems: CartItem[];
//   }
  
//   interface UserCartContextType {
//     cart: Cart;
//     fetchCart: () => Promise<void>;
//     handleRemoveItem: (itemId: number) => Promise<void>;
//   }

// const UserCartContext = createContext<UserCartContextType | undefined>(undefined);

// export const UserCartProvider = ({ children }: { children: ReactNode }) => {
//     const [cart, setCart] = useState<Cart>({ cartItems: [] });
    
//     const { userId } = useUser();

//     const fetchCart = async () => {
//         if (!userId) return; // Ensure userId is available before making the request
//         try{
//             const response = await axios.post("/api/cart", { userId });
//             setCart(response.data);
//             // console.log(response.data);
//         }catch(error){
//             console.error("Error fetching user cart:", error);
//         }
//     }

//     const handleRemoveItem = async (itemId: number) => {
//         try{
//             await axios.delete("/api/cart/remove", {data: {cartItemId: itemId} });
//             setCart((prevCart) => ({
//                 ...prevCart,
//                 cartItems: prevCart.cartItems.filter((item) => item.id !== itemId),
//             }));
//         }catch(error){
//             console.error("Error removing item:", error);
//         }
//     }

//     useEffect(()=>{
//         fetchCart();
//     },[userId])

//     return (
//         <UserCartContext.Provider value={{ cart, fetchCart, handleRemoveItem }}>
//             {children}
//         </UserCartContext.Provider>
//     );
// };

// export const useUserCart = () => {
//     const context = useContext(UserCartContext);
//     if (!context) {
//         throw new Error("useUser must be used within a UserProvider");
//     }
//     return context;
// };
