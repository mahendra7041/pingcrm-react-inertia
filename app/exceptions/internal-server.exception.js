import HttpStatus from "../constraints/http-status.enum.js";
import HttpException from "./http.exception.js";

export default class InternalServerException extends HttpException {
  constructor() {
    super("Internal Serve Error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
