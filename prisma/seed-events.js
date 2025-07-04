const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding events...');

  // First, clear existing events to avoid duplicates
  await prisma.event.deleteMany({});

  const events = [
    {
      title: 'Praise Night 23',
      date: new Date('2024-05-25T14:00:00Z'), // 2PM GMT+1
      minister: 'With Pastor Chris Oyakhilome',
      platform: 'Streaming on LWFS TV',
      time: '2PM GMT+1',
      imageUrl: 'https://picsum.photos/400/300?random=1',
      link: 'https://lwfoundationschool.org/live',
      isActive: true
    },
    {
      title: 'June Communion Service',
      date: new Date('2024-06-01T15:00:00Z'), // 3PM GMT+1
      minister: 'With Pastor Chris Oyakhilome',
      platform: 'Streaming on LWFS TV',
      time: '3PM GMT+1',
      imageUrl: 'https://picsum.photos/400/300?random=2',
      link: 'https://lwfoundationschool.org/live',
      isActive: true
    },
    {
      title: 'Healing Service',
      date: new Date('2024-06-15T16:00:00Z'), // 4PM GMT+1
      minister: 'With Pastor Chris Oyakhilome',
      platform: 'Streaming on LWFS TV',
      time: '4PM GMT+1',
      imageUrl: 'https://picsum.photos/400/300?random=3',
      link: 'https://lwfoundationschool.org/live',
      isActive: true
    },
    {
      title: 'Prayer Meeting',
      date: new Date('2024-06-30T17:00:00Z'), // 5PM GMT+1
      minister: 'With Pastor Chris Oyakhilome',
      platform: 'Streaming on LWFS TV',
      time: '5PM GMT+1',
      imageUrl: 'https://picsum.photos/400/300?random=4',
      link: 'https://lwfoundationschool.org/live',
      isActive: true
    }
  ];

  // Create all events
  await prisma.event.createMany({
    data: events
  });

  console.log('✅ Events seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding events:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 