import { Router } from "express";
import * as authController from "./controllers/auth.controller.js";
import * as dashboardController from "./controllers/dashboard.controller.js";

const router = new Router();

router.get("/", dashboardController.index);

router.get("/login", authController.index);
router.post("/login", authController.store);

export default router;
