import { NextResponse } from "next/server";
import Cart from "@/lib/models/Cart";
import CartItem from "@/lib/models/CartItem";

interface CartRequest {
  userId: number;
  productId: number;
  quantity?: number;
  color?: string;
}

export async function POST(req: Request) {
  try {
    const { userId, productId, quantity, color }:CartRequest = await req.json();
    if (!userId || !productId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({ userId });
      cart = await Cart.findOne({ where: { userId } }); // Ensure we fetch the newly created cart
    }

    if (!cart || !cart.id) {
      return NextResponse.json({ error: "Failed to create or retrieve cart" }, { status: 500 });
    }

    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

    if (cartItem) {
      await cartItem.update({ quantity: cartItem.quantity + (quantity || 1), color: color || cartItem.color});
    } else {
      cartItem = await CartItem.create({ cartId: cart.id, productId, quantity: quantity || 1, color });
    }

    return NextResponse.json({ message: "Added to cart", cartItem });
  } catch (error ) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
