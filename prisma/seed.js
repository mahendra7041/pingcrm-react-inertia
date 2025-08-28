import prisma from "../app/services/prisma.service.js";
import bcrypt from "bcryptjs";
import {
  contactFactory,
  organizationFactory,
  userFactory,
} from "./factories.js";

function getRandomRecord(arr) {
  if (!arr || arr.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

async function main() {
  const password = await bcrypt.hash("secret", 10);

  const account = await prisma.account.create({
    data: {
      name: "Acme Corporation",
    },
  });

  await prisma.user.create({
    data: {
      account: {
        connect: {
          id: account.id,
        },
      },
      firstName: "John",
      lastName: "doe",
      email: "johndoe@example.com",
      owner: true,
      password,
    },
  });

  await prisma.user.createMany({
    data: await userFactory(5, {
      accountId: account.id,
    }),
  });

  await prisma.organization.createMany({
    data: await organizationFactory(100, {
      accountId: account.id,
    }),
  });

  const organizations = await prisma.organization.findMany();
  await prisma.contact.createMany({
    data: await contactFactory(100, {
      accountId: account.id,
      organizationId: getRandomRecord(organizations).id,
    }),
  });

  console.log("✅ Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
