import { Router } from "express";
import { getProducts } from "../controllers/adminController";
import { orderItems } from "../controllers/userController";

const router = Router();

router.get("/list-items", getProducts);

router.post("/order-items", orderItems);

export default router;
