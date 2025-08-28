import prisma from "../app/services/prisma.service.js";

async function main() {
  if (process.env.NODE_ENV === "production") {
    console.log(
      "⚠️  Warning: Truncate script should NOT be run in production!"
    );
    return;
  }

  console.log("⚠️  Truncating database...");

  await prisma.contact.deleteMany({});
  await prisma.organization.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.account.deleteMany({});

  console.log("✅ All tables truncated!");
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    prisma.$disconnect();
  });
