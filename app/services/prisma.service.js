import { PrismaClient } from "@prisma/client";
import { createPaginator } from "prisma-extension-pagination";

const prisma = new PrismaClient();

const paginator = createPaginator();

const extendedPrisma = prisma
  .$extends({
    result: {
      contact: {
        name: {
          needs: { firstName: true, lastName: true },
          compute(user) {
            return `${user.firstName} ${user.lastName}`;
          },
        },
      },
    },
  })
  .$extends({
    model: {
      organization: {
        paginate: paginator,
      },
      contact: {
        paginate: paginator,
      },
    },
  });

export default extendedPrisma;
