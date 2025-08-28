import { validate } from "../utils/validator.js";
import passport from "../utils/passport.js";
import ValidationException from "../exceptions/validation.exception.js";

export function index(req, res, next) {
  res.inertia.render("auth/login");
}

export function store(req, res, next) {
  validate(req.body, {
    email: "email|required",
    password: "string|required",
    remember: "boolean|required",
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return next(
        new ValidationException("Validation Exception", {
          email: "These credentials do not match our records.",
        })
      );
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.inertia.redirect("/");
    });
  })(req, res, next);
}

export function logout(req, res, next) {
  req.logout(() => {
    req.session.destroy(function () {});
  });
  res.inertia.redirect("/login");
}
