// ./src/app/api/cart/clear/route.ts
import { prisma } from '../../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserIdFromHeader } from '../../../../../lib/getUserId';

export async function DELETE(request: NextRequest) {
  const userId = getUserIdFromHeader(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Delete all cart items for the user
    const deletedItems = await prisma.cartItem.deleteMany({
      where: {
        userId: userId
      }
    });

    return NextResponse.json({ 
      message: 'Cart cleared successfully',
      deletedCount: deletedItems.count
    });
  } catch (error: any) {
    console.error('DELETE /api/cart/clear: Error clearing cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}