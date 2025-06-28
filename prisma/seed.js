import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed 1 User
  // const user = await prisma.user.upsert({
  //   where: { email: 'user@example.com' },
  //   update: {},
  //   create: {
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     zone: 'North',
  //     city: 'Lagos',
  //     country: 'Nigeria',
  //     phoneNumber: '+2348012345678',
  //     church: 'Example Church',
  //     email: 'user@example.com',
  //     password: 'hashedPassword123', // In real apps, hash this!
  //     verified: true,
  //     verifiedAt: new Date(),
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // });

  // Seed 15 Products
  const products = await Promise.all(
    Array.from({ length: 15 }, (_, i) =>
      prisma.product.create({
        data: {
          name: `Product ${i + 1}`,
          description: `Description for Product ${i + 1}`,
          price: 19.99 + i * 10,
          imageUrl: `https://picsum.photos/200/300?random=${i + 1}`,
          stock: 100 + i * 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    )
  );

  // Seed 1 Live Program
  const program = await prisma.program.create({
    data: {
      title: 'Live Worship Program',
      description: 'A live worship event for the community',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      isLive: true,
      startTime: new Date(),
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Link User to Program
  // await prisma.userProgram.create({
  //   data: {
  //     userId: user.id,
  //     programId: program.id,
  //     joinedAt: new Date(),
  //     watchedDuration: 3600, // seconds
  //     participated: true,
  //   },
  // });

  console.log('✅ Seeding completed');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
