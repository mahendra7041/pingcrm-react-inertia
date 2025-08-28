import UnAuthorizedException from "../exceptions/unauthorized.exception.js";

export default function authMiddleware(req, res, next) {
  if (req.isUnauthenticated()) {
    return next(new UnAuthorizedException());
  }
  next();
}
