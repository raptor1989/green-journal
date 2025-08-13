import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed users
  await prisma.user.createMany({
    data: [
      { email: 'alice@example.com', name: 'Alice', location: 'NYC' },
      { email: 'bob@example.com', name: 'Bob', location: 'SF' },
    ],
  });
  // Add more seed data for actions, challenges, rewards, etc. as needed
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
