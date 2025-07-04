// app/api/cart/increase/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserIdFromCookie } from '@/lib/getUserId';

export async function PATCH(request: NextRequest) {
  const userId = getUserIdFromCookie(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId } = await request.json();

  const updated = await prisma.cartItem.update({
    where: {
      userId_productId: { userId, productId }
    },
    data: {
      quantity: { increment: 1 }
    }
  });

  return NextResponse.json(updated);
}
