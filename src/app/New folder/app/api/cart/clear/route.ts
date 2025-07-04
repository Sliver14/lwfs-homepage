// app/api/cart/clear/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserIdFromCookie } from '@/lib/getUserId';

export async function DELETE(request: NextRequest) {
  const userId = getUserIdFromCookie(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.cartItem.deleteMany({ where: { userId } });
  return NextResponse.json({ message: 'Cart cleared' });
}
