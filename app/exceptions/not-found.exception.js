import HttpStatus from "../constraints/http-status.enum.js";
import HttpException from "./http.exception.js";

export default class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super(message, HttpStatus.NOT_FOUND);
  }
}
