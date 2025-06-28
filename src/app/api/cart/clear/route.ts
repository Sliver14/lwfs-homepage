// ./src/app/api/cart/clear/route.ts
import { prisma } from '../../../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getUserIdFromHeader } from '../../../../../lib/getUserId'; // <--- UPDATED IMPORT

export async function DELETE(request: NextRequest) {
   const userId = getUserIdFromHeader(request); // <--- UPDATED FUNCTION CALL
   if (!userId) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }

   try {
       await prisma.cartItem.deleteMany({
           where: { userId },
       });
       return NextResponse.json({ message: 'Cart cleared successfully' });
   } catch (error) {
       console.error('Error clearing cart:', error);
       return NextResponse.json({ error: 'Failed to clear cart' }, { status: 500 });
   }
}