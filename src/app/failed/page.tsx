"use client"; // Ensure it's a client component
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePayment } from "../../context/PaymentContext";
import axios from "axios";

interface TransactionStatus {
  transaction_status: string;
}

function FailedPayment() {
  const router = useRouter();
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus  | null>(null);
  const {  paymentRef } = usePayment();

  useEffect(()=>{
    if (!paymentRef) return; // Prevent calling API without a reference

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
            // alert("Failed to confirm payment.");
          }
      } 
      confirmPayment();
  },[paymentRef])
  return (

    <div className="flex flex-col w-screen min-h-screen">
      {!paymentRef ? "":
        <div className="flex flex-col gap-5  items-center">
        <div className="flex flex-col w-full h-auto">
            <video autoPlay loop muted className="flex felx-col w-full h-full object-cover">
                <source src="/failedPayment.webm" type="video/webm" />
            </video>
        </div>
        <h1 className="flex text-2xl font-bold text-wrap px-5 text-center">Payment failed. Try again later</h1>
        <span>{transactionStatus?.transaction_status}</span>
        <button onClick={()=> router.push("/")} className="bg-blue-950 py-2 px-5 cursor-pointer text-white rounded-md">Back to Rources</button>
        </div>
      }
        
      
    </div>
  )
}

export default FailedPayment
