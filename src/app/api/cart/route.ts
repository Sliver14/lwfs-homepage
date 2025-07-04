import { prisma } from '../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserIdFromHeader } from '../../../../lib/getUserId'; // ✅ Import the new function
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  console.log('--- GET /api/cart Request Started ---');

  const userId = getUserIdFromHeader(request); // Attempt to get userId from headers
  console.log('GET /api/cart: Extracted userId from header:', userId); // Log the extracted userId

  if (!userId) {
    console.log('GET /api/cart: Unauthorized - No userId found in headers.');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const cart = await prisma.cartItem.findMany({
      where: { userId }, // This is the crucial filter
      include: { product: true },
    });

    console.log(`GET /api/cart: Querying cart for userId: ${userId}`); // Confirm userId used in query
    console.log(`GET /api/cart: Found ${cart.length} items for userId: ${userId}`); // Log the number of items found
    if (cart.length === 0) {
      console.log('GET /api/cart: Cart is empty for this user. Confirm items exist for this exact userId in DB.');
    }
    console.log('GET /api/cart: Retrieved cart data (first 5 items):', cart.slice(0, 5)); // Log a slice to avoid giant outputs

    return NextResponse.json(cart);
  } catch (error: unknown) { // Use 'unknown' for general error type initially
    console.error('GET /api/cart: Error fetching cart:', error);
    // Optionally log error details from Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma Error Code:', error.code);
      console.error('Prisma Error Meta:', error.meta);
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    console.log('--- GET /api/cart Request Finished ---');
  }
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromHeader(request); // ✅ Use the new function
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

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
      },
      include: { product: true }
    });

    return NextResponse.json(item);
  } catch (error: unknown) {
    console.error('POST /api/cart: Error adding item to cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}