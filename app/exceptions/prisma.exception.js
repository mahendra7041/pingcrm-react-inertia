import NotFoundException from "./not-found.exception.js";
import { Prisma } from "@prisma/client";

export default class PrismaException {
  static handler(error, req, res, next) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        return next(new NotFoundException("No Record Found"));
      }
    }
    next(error);
  }
}
