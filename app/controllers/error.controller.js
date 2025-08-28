export function notFound(req, res) {
  res.inertia.render("error", { status: 404 });
}
