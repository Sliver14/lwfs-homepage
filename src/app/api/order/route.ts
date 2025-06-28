// // src/app/api/order/route.ts
// import { prisma } from '../../../../lib/prisma'; // Consider using '@/lib/prisma' alias if configured
// import { getUserIdFromCookie } from '../../../../lib/getUserId'; // Consider using '@/lib/getUserId' alias if configured
// import { NextRequest, NextResponse } from 'next/server';

// // You still need to import Prisma for potential other types like Prisma.Decimal or model types,
// // but for the payload, we'll infer it directly from the query.
// import { PrismaClient } from '@prisma/client'; // Import PrismaClient itself for type inference

// export async function POST(request: NextRequest) {
//   const userId = getUserIdFromCookie(request);
//   if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const cartItems = await prisma.cartItem.findMany({
//     where: { userId },
//     include: { product: true }
//   });

//   if (cartItems.length === 0) {
//     return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
//   }

//   // Solution: Infer the type of each item directly from the prisma query result
//   // This gets the type of the array returned by findMany, then [number] gets the type of a single element.
//   type CartItemWithProduct = Awaited<ReturnType<typeof prisma.cartItem.findMany>>[number];

//   const totalAmount = cartItems.reduce((sum: number, item: CartItemWithProduct) => {
//     // Ensure item.product.price is treated as a number.
//     // If your product price is a Prisma.Decimal type, Number() is fine for conversion to a JS number.
//     return sum + Number(item.product.price) * item.quantity;
//   }, 0);

//   const order = await prisma.order.create({
//     data: {
//       userId,
//       totalAmount,
//       items: {
//         create: cartItems.map(item => ({
//           productId: item.productId,
//           quantity: item.quantity,
//           price: item.product.price // Ensure this price type matches your OrderItem schema's price field
//         }))
//       }
//     },
//     include: { items: true }
//   });

//   await prisma.cartItem.deleteMany({ where: { userId } });

//   return NextResponse.json({ message: 'Order placed', order });
// }

// export async function GET(request: NextRequest) {
//   const userId = getUserIdFromCookie(request);
//   if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const orders = await prisma.order.findMany({
//     where: { userId },
//     include: { items: { include: { product: true } } },
//     orderBy: { createdAt: 'desc' }
//   });

//   return NextResponse.json(orders);
// }

export async function POST(){
  
}