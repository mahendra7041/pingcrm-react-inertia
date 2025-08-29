import HttpStatus from "../constraints/http-status.enum.js";

export default function globalExceptionHandler(error, req, res, next) {
  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }
  if (!!req.accepts("html") || req.get("x-inertia")) {
    return res.inertia.render("error", {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  } else if (!!req.accepts("application/json")) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  } else {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
}
