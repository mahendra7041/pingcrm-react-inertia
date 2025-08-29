import HttpStatus from "../constraints/http-status.enum.js";
import HttpException from "./http.exception.js";

export default class BadRequest extends HttpException {
  constructor() {
    super("Bad request", HttpStatus.BAD_REQUEST);
  }
}
