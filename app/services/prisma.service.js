import { PrismaClient } from "@prisma/client";
import { createPaginator } from "prisma-extension-pagination";

const prisma = new PrismaClient();

const paginator = createPaginator();

const extendedPrisma = prisma.$extends({
  model: {
    organization: {
      paginate: paginator,
    },
  },
});

export default extendedPrisma;
