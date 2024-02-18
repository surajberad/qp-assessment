import { Request, Response } from "express";
import { productModel } from "../models/productModel";

export const addProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { productName, price, quantity } = req.body;
  const newProduct = new productModel({
    name: productName,
    price: price,
    quantity: quantity,
  });
  try {
    await newProduct
      .save()
      .then((result) => res.send(`New Product added with id : ${result._id}`));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProducts = async (
  _: any,
  res: Response
): Promise<Response | void> => {
  try {
    const products = await productModel.find({}, ["name", "price", "quantity"]);
    if (!products) return res.status(404).json("No products found");
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const productId = req.params.productId;
  if (!productId) return res.status(400).json("Missing parameter");
  try {
    const removedProd = await productModel.findByIdAndDelete(productId);
    if (!removedProd) {
      return res.status(404).json("No such product is present in the database");
    }
    res.status(200).json("The product has been deleted successfully");
  } catch {
    res.status(400).json("Failed to delete the product");
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { productId, ...updateValues } = req.body;
  if (!productId) return res.status(400).json("Missing productId");
  try {
    const updateProduct = await productModel.findByIdAndUpdate(
      productId,
      { $set: { ...updateValues } },
      { new: true }
    );
    if (!updateProduct)
      return res
        .status(404)
        .json("No such product is present in the database.");
    else res.status(201).json(updateProduct);
  } catch (e) {
    res.status(400).json("Updating Failed");
  }
};
