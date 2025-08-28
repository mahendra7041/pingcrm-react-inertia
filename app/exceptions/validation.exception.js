export default class ValidationException extends Error {
  constructor(message, errors) {
    super(message);
    this.cause = errors;
    this.message = message;
  }

  get errors() {
    return this.cause;
  }

  set errors(value) {
    this.cause = value;
  }

  get response() {
    return {
      message: this.message,
      errors: this.errors,
    };
  }

  static handler(error, req, res, next) {
    if (error instanceof ValidationException) {
      if (req.get("x-inertia")) {
        const previousUrl = req.get("Referer") || req.url;
        req.flash.set("errors", error.errors);
        return res.inertia.redirect(previousUrl);
      }
      return res.status(422).json(error.response);
    }
    next(error);
  }
}
