import { Router } from "express";
import {
  addProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/adminController";

const router = Router();

router.get("/list-items", getProducts);

router.post("/add-new-item", addProduct);

router.get("/remove-item/:productId", removeProduct);

router.post("/update-item", updateProduct);

export default router;
