import { prisma } from '../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserIdFromHeader } from '../../../../lib/getUserId'; // ✅ Import the new function

export async function GET(request: NextRequest) {
  const userId = getUserIdFromHeader(request); // ✅ Use the new function
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const cart = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  return NextResponse.json(cart);
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromHeader(request); // ✅ Use the new function
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId } = await request.json();

  const item = await prisma.cartItem.upsert({
    where: {
      userId_productId: { userId, productId }
    },
    update: {
      quantity: { increment: 1 }
    },
    create: {
      userId,
      productId,
      quantity: 1
    }
  });

  return NextResponse.json(item);
}