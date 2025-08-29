export default class HttpException extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

  static handler(error, req, res, next) {
    if (error instanceof HttpException) {
      if (!!req.accepts("html") || req.get("x-inertia")) {
        return res.inertia.render("error", { status: error.statusCode });
      } else if (!!req.accepts("application/json")) {
        return res.status(error.statusCode).json({
          message: error.message,
          statusCode: error.statusCode,
        });
      } else {
        return res.status(error.statusCode).send(error.message);
      }
    }
    next(error);
  }
}
