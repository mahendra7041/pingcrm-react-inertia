import HttpStatus from "../constraints/http-status.enum.js";
import HttpException from "./http.exception.js";

export default class UnAuthorizedException extends HttpException {
  constructor() {
    super("Unauthorized", HttpStatus.UNAUTHORIZED);
  }

  static handler(error, req, res, next) {
    if (
      error instanceof UnAuthorizedException &&
      (req.get("x-inertia") || req.accepts("text/html"))
    ) {
      return res.inertia.redirect("/login");
    }
    next(error);
  }
}
