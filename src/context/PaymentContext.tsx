"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

// Define the structure of CartItem
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
  
  // Define the structure of Cart
  interface Cart {
    id: number;
    userId: string;
    cartItems: CartItem[];
  }
  
  // Define the PaymentContextType
  interface PaymentContextType {
    paymentRef: string;
    handleCheckout: (cart: Cart, totalCartPrice: number) => Promise<void>;
  }

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
    const [paymentRef, setPaymentRef] = useState<string>("");
    const apiUrl = process.env.NEXT_PUBLIC_URL;
    const merchant_wallet = process.env.NEXT_WALLET_ADDRESS;

    const handleCheckout = async (cart: Cart, totalCartPrice: number) => {
        try{
            const response = await axios.post("/api/cart/checkout", {
                product_sku: cart.id,
                narration: "Order Payment",
                price: totalCartPrice,
                merchant_wallet: merchant_wallet || "",
                success_url: `${apiUrl}/success`,
                fail_url: `${apiUrl}/failed`,
                user_data: { userId: cart.userId }
            });
              console.log(response.data.payment_ref);
              setPaymentRef(response.data.payment_ref);              
    
          }catch(error){
            console.error("Payment error:", error);
            alert("Error Verifying product. Please try again.");
          }
    }

    

    return (
        <PaymentContext.Provider value={{ paymentRef, handleCheckout }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error("usePayment must be used within a UserProvider");
    }
    return context;
};
