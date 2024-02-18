import mongoose, { Document } from "mongoose";

export interface Product extends Document {
  price: number;
  name: string;
  quantity: number;
}

const ProductSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model<Product>("Product", ProductSchema);
