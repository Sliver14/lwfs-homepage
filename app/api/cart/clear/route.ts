import { NextResponse } from "next/server";
import CartItem from "@/lib/models/CartItem";

export async function DELETE(req: Request) {
  try {
    const { cart_id } = await req.json();
    if (!cart_id) return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });

    await CartItem.destroy({ where: { cart_id } });
    return NextResponse.json({ message: "Cart cleared" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
