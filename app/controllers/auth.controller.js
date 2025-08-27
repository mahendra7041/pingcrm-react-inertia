export function index(req, res, next) {
  res.inertia.render("auth/login");
}

export function store(req, res, next) {
  console.log(req.body);
  res.redirect("/");
}
