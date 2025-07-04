import { prisma } from '../../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserIdFromHeader } from '../../../../../lib/getUserId';

export async function DELETE(request: NextRequest) {
  const userId = getUserIdFromHeader(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { cartItemId } = body;

    if (!cartItemId) {
      return NextResponse.json({ error: 'cartItemId is required' }, { status: 400 });
    }

    // Verify the cart item belongs to the user before deleting
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId: userId
      }
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found or unauthorized' }, { status: 404 });
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: {
        id: cartItemId
      }
    });

    return NextResponse.json({ message: 'Item removed from cart successfully' });
  } catch (error: any) {
    console.error('DELETE /api/cart/remove: Error removing item from cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}