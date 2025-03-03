"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

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
  
//   interface PaymentContextType {
//     payment: Payment;
//     handleCheckout: () => Promise<void>;
//     confirmPayment: () => Promise<void>;
//   }

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
    const [paymentRef, setPaymentRef] = useState("");
    const [ transactionStatus, setTransactionStatus ] = useState("");

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

    const confirmPayment = async () => {
        try {
          const response = await axios.post(
            "/api/confirmpayment",
            { payment_ref: paymentRef },
          );
          setTransactionStatus(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error confirming payment", error);
          alert("Failed to confirm payment.");
        }
    } 

    useEffect(()=>{
        if (!paymentRef) return; // Prevent calling API without a reference 
          confirmPayment();
      },[paymentRef])

    

    return (
        <PaymentContext.Provider value={{ payment, handleCheckout, confirmPayment }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
