import { NextResponse } from "next/server";
import CartItem from "@/lib/models/CartItem";

export async function DELETE(req: Request) {
  try {
    const { cartItemId } = await req.json();
    if (!cartItemId) return NextResponse.json({ error: "Cart item ID is required" }, { status: 400 });

    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    await cartItem.destroy();
    return NextResponse.json({ message: "Item removed" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
