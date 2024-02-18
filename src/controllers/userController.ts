import { NextFunction, Request, Response } from "express";
import { Product, productModel } from "../models/productModel";

export const orderItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { products } = req.body;
  try {
    if (!products || !Array.isArray(products))
      return res.status(400).json("Invalid data");

    for (const product of products) {
      const fetchedProduct: Product | null = await productModel.findById(
        product?.id,
        ["name", "quantity"]
      );
      if (!fetchedProduct)
        return res.status(400).json(`Product with id ${product?.id} not found`);
      if (product.quantity > fetchedProduct.quantity) {
        return res
          .status(400)
          .json(`Quantity is not available for product ${product.id}`);
      }
    }

    products.forEach(async (product: Product): Promise<Response | void> => {
      const fetchedProduct: Product | null = await productModel.findById(
        product?.id,
        ["name", "quantity"]
      );
      if (fetchedProduct) {
        await productModel.findByIdAndUpdate(
          product.id,
          {
            $set: { quantity: fetchedProduct.quantity - product.quantity },
          },
          { new: true }
        );
      }
    });

    res.status(200).json("Orders placed successfully!");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
