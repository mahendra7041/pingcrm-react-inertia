import HttpStatus from "../constraints/http-status.enum.js";

export function notFound(req, res) {
  res.inertia.render("error", {
    statusCode: HttpStatus.NOT_FOUND,
    message: "Page Not Found",
  });
}
