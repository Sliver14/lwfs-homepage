// app/api/cart/decrease/route.ts
import { prisma } from '../../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserIdFromCookie } from '../../../../../lib/getUserId';

export async function PATCH(request: NextRequest) {
  const userId = getUserIdFromCookie(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId } = await request.json();

  const item = await prisma.cartItem.findUnique({
    where: {
      userId_productId: { userId, productId }
    }
  });

  if (!item || item.quantity <= 1) {
    await prisma.cartItem.delete({
      where: {
        userId_productId: { userId, productId }
      }
    });
    return NextResponse.json({ message: 'Item removed' });
  }

  const updated = await prisma.cartItem.update({
    where: {
      userId_productId: { userId, productId }
    },
    data: {
      quantity: { decrement: 1 }
    }
  });

  return NextResponse.json(updated);
}
