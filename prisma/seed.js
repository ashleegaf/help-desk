const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const users = require('./data/users');
const agents = require('./data/agents');

const main = async () => {
  await prisma.employee.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();
  console.log('Start seeding...');

  for (const a of agents) {
    const agent = await prisma.employee.create({ data: a });
    console.log(`Created agent with id: ${agent.id}`);
  }

  for (const u of users) {
    const user = await prisma.user.create({ data: u });
    console.log(`Created user with id: ${user.id}`);
  }

  console.log('Finished seeding.');
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
