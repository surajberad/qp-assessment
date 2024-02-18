import { Router } from "express";
import userRouter from "../src/routes/userRoutes";
import adminRouter from "../src/routes/adminRoutes";

const router = Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);

export default router;
