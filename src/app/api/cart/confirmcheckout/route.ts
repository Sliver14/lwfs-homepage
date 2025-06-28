import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { payment_ref } = await req.json();

    const API_KEY = process.env.API_KEY; // Load from env variables

    // Call external API
    const response = await fetch("https://api.espees.org/v2/payment/confirm/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY as string,
      },
      body: JSON.stringify({ payment_ref }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Payment confirmation error:", error);
    return NextResponse.json({ error: "Failed to confirm payment" }, { status: 500 });
  }
}
