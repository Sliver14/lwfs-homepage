const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createLiveProgram() {
  try {
    // Check if there's already a live program
    const existingProgram = await prisma.program.findFirst({
      where: { isLive: true }
    });

    if (existingProgram) {
      console.log('Live program already exists:', existingProgram.title);
      return;
    }

    // Create a new live program
    const program = await prisma.program.create({
      data: {
        title: 'LWFS Live Service',
        description: 'Live streaming service from Living Word Foundation School',
        videoUrl: 'https://2nbyjxnbl53k-hls-live.5centscdn.com/RTV/59a49be6dc0f146c57cd9ee54da323b1.sdp/chunks.m3u8',
        isLive: true,
        startTime: new Date(),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      }
    });

    console.log('Live program created successfully:', program);
  } catch (error) {
    console.error('Error creating live program:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createLiveProgram(); 