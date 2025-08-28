import { Router } from "express";
import * as authController from "./controllers/auth.controller.js";
import * as dashboardController from "./controllers/dashboard.controller.js";
import * as organizationController from "./controllers/organization.controller.js";
import * as errorController from "./controllers/error.controller.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const router = new Router();

router.get("/", authMiddleware, dashboardController.index);
router.get("/organizations", authMiddleware, organizationController.index);
router.get(
  "/organizations/create",
  authMiddleware,
  organizationController.create
);
router.post("/organizations", authMiddleware, organizationController.store);
router.get(
  "/organizations/:id/edit",
  authMiddleware,
  organizationController.edit
);
router.put("/organizations/:id", authMiddleware, organizationController.update);
router.delete(
  "/organizations/:id",
  authMiddleware,
  organizationController.destroy
);
router.put(
  "/organizations/:id/restore",
  authMiddleware,
  organizationController.restore
);

router.get("/login", authController.index);
router.post("/login", authController.store);

router.get("*all", errorController.notFound);

export default router;
