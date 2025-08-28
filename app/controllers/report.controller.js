export async function index(req, res, next) {
  res.inertia.render("reports/index");
}
