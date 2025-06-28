import { nanoid } from 'nanoid';
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
      const { 
        narration,
        price,
        success_url,
        fail_url,
        user_data,
       } = await req.json();
      
       if (!narration || !price || !success_url || !fail_url) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
      }

      const transactionId = `TXN-${nanoid(10)}`;
      console.log("Generated Transaction ID:", transactionId);


      const API_KEY = process.env.API_KEY; // Load from env variables
      const NEXT_WALLET_ADDRESS = process.env.NEXT_WALLET_ADDRESS; 
      
  
      // Call external API
      const response = await fetch("https://api.espees.org/v2/payment/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY as string,
        },
        body: JSON.stringify({ 
            product_sku: transactionId,
            narration,
            price,
            merchant_wallet: NEXT_WALLET_ADDRESS,
            success_url,
            fail_url,
            user_data,
         }),
      });
  
      const data = await response.json();
  
      return NextResponse.json(data);
    } catch (error) {
      console.error("Payment verification error:", error);
      return NextResponse.json({ error: "Failed to verify product" }, { status: 500 });
    }
  }