import { NextResponse } from "next/server";
import Cart from "@/lib/models/Cart";
import CartItem from "@/lib/models/CartItem";
import Products from "@/lib/models/Products";

export async function POST(req: Request) {
  try {
    // const { searchParams } = new URL(req.url);
    // const userId = searchParams.get("user_id");
    const { userId } = await req.json(); // Extract userId from body

    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          as: "cartItems", // ✅ Correct alias
          
          include: [
            {
              model: Products,
              as: "product", // ✅ Correct alias
            },
          ],
        },
      ],
    });

    if (!cart) return NextResponse.json({ message: "Cart is empty" });

    return NextResponse.json(cart);
  } catch (error) {
    const err = error as Error; // ✅ Explicitly cast to Error
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
