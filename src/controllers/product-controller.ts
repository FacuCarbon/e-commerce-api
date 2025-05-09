import { Request, Response } from "express";
import { ProductModel } from "../models/product-model";

export class ProductController {
  static async getAll(request: Request, response: Response) {
    const category = request.query?.category as string;
    const products = await ProductModel.getAll({ category });
    response.status(200).json({
      count: products?.length,
      products: products,
    });
  }

  static async getProductById(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ message: "El id del producto no puede estar vacio." });
    }
  }
}
