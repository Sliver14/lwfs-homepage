import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { 
        product_sku,
        narration,
        price,
        merchant_wallet,
        success_url,
        fail_url,
        user_data,
       } = await req.json();
  
      const API_KEY = process.env.API_KEY; // Load from env variables
  
      // Call external API
      const response = await fetch("https://api.espees.org/v2/payment/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY as string,
        },
        body: JSON.stringify({ 
            product_sku,
            narration,
            price,
            merchant_wallet,
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