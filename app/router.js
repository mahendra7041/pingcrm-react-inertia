import { Router } from "express";
import * as authController from "./controllers/auth.controller.js";
import * as userController from "./controllers/user.controller.js";
import * as dashboardController from "./controllers/dashboard.controller.js";
import * as organizationController from "./controllers/organization.controller.js";
import * as contactController from "./controllers/contact.controller.js";
import * as reportController from "./controllers/report.controller.js";
import * as errorController from "./controllers/error.controller.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import { upload } from "./utils/multer.js";

const router = new Router();

router.get("/", authMiddleware, dashboardController.index);

router.get("/users", authMiddleware, userController.index);
router.get("/users/create", authMiddleware, userController.create);
router.post(
  "/users",
  authMiddleware,
  upload.single("photo"),
  userController.store
);
router.get("/users/:id/edit", authMiddleware, userController.edit);
router.put("/users/:id", authMiddleware, userController.update);
router.delete("/users/:id", authMiddleware, userController.destroy);
router.put("/users/:id/restore", authMiddleware, userController.restore);

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

router.get("/contacts", authMiddleware, contactController.index);
router.get("/contacts/create", authMiddleware, contactController.create);
router.post("/contacts", authMiddleware, contactController.store);
router.get("/contacts/:id/edit", authMiddleware, contactController.edit);
router.put("/contacts/:id", authMiddleware, contactController.update);
router.delete("/contacts/:id", authMiddleware, contactController.destroy);
router.put("/contacts/:id/restore", authMiddleware, contactController.restore);

router.get("/reports", authMiddleware, reportController.index);

router.get("/login", authController.index);
router.post("/login", authController.store);
router.delete("/logout", authController.logout);

// router.get("*all", errorController.notFound);

export default router;
