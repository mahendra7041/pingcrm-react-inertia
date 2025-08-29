import HttpStatus from "../constraints/http-status.enum.js";
import HttpException from "./http.exception.js";
import NotFoundException from "./not-found.exception.js";
import { Prisma } from "@prisma/client";

export default class PrismaException {
  static handler(error, req, res, next) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        return next(new NotFoundException("No Record Found"));
      } else if (error.code == "P2010") {
        return next(
          new HttpException("Request Timeout", HttpStatus.REQUEST_TIMEOUT)
        );
      }
    }
    next(error);
  }
}
