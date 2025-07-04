"use client"; // Ensure it's a client component

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { usePayment } from "../../context/PaymentContext";

interface TransactionStatus {
  transaction_status: string;
  status_details?: string; // ✅ Make this optional to handle cases where it's missing
}


function SuccessPaymentContent() {
    const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | null>(null);
    const router = useRouter(); 
    // const searchParams = useSearchParams();
    // const paymentRef = searchParams.get("payment_ref");
    const { paymentRef } = usePayment();

    // useEffect(()=>{
    //   setTransactionStatus(null);
    // },[])

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
              alert("Failed to confirm payment.");
            }
        } 
        confirmPayment();
    },[paymentRef])

  return (
    <div>
        <div className="flex flex-col gap-5  items-center">
            <div className="flex flex-col w-full h-auto">
                <video autoPlay loop muted className="flex flex-col w-full h-full object-cover">
                    <source src="/successPayment.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <h1 className="text-2xl font-bold text-wrap px-5 text-center">{transactionStatus?.status_details}</h1>
            <span>{transactionStatus?.transaction_status}</span>
            <button onClick={()=> router.push("/")} className="bg-blue-950 py-2 px-5 cursor-pointer text-white rounded-md">Back to Rosources</button>
        </div>
      
    </div>
  )
}

export default function SuccessPayment() {
  return (
      <Suspense fallback={<p className="text-center text-lg">Processing payment...</p>}>
          <SuccessPaymentContent />
      </Suspense>
  );
}