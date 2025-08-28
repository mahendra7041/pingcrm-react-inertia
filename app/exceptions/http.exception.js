export default class HttpException extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

  static handler(error, req, res, next) {
    if (error instanceof HttpException) {
      if (req.get("x-inertia")) {
        return res.inertia.redirect("/login");
      }
      return res.status(error.statusCode).json({
        message: error.message,
        statusCode: error.statusCode,
      });
    }
    next(error);
  }
}
