import { Router } from "express";
import thoughtRoutes from "./thoughtRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/thoughts", thoughtRoutes); // Routes for thoughts
router.use("/users", userRoutes); // Routes for users

export default router;
