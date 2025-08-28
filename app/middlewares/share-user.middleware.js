export default function shareUser(_req, res, next) {
  res.inertia.share({
    auth: (req) => ({ user: req.user }),
  });
  next();
}
