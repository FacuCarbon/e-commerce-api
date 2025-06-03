import { Request, Response } from "express";
import { ProductModel } from "../models/product-model";

export class ProductController {
  static async getAll(request: Request, response: Response) {
    const category = request.query?.category as string;
    const sortPrice = request?.query?.sortPrice as "asc" | "desc";
    const products = await ProductModel.getAll({ category, sortPrice });

    response.status(200).json({
      count: products?.length,
      products: products,
    });
  }
  //
  static async getProduct(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      response
        .status(400)
        .json({ message: "El id del producto no puede estar vacio." });
    }
    const product = await ProductModel.getProductById({ id });

    if (!product) {
      response.status(404).json({ message: "Producto no encontrado." });
    }

    response.status(200).json(product);
  }
  //
  static async createProduct(request: Request, response: Response) {
    const product = request.body;
    const newProduct = await ProductModel.createProduct(product);
    if (!newProduct?.id) {
      response.status(500).json({ message: "Error al crear el producto." });
    }
    response.status(201).json({
      message: "Producto creado con éxito.",
      product: newProduct,
    });
  }
  //

  static async deleteProduct(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      response
        .status(404)
        .json({ message: "El id del producto no puede estar vacio." });
    }

    const product = await ProductModel.getProductById({ id });
    if (!product) {
      response.status(404).json({ message: "Producto no encontrado." });
    }

    await ProductModel.deleteProductById({ id });

    response.status(200).json({ message: "Producto eliminado con éxito." });
  }

  //

  static async updateProduct(request: Request, response: Response) {
    const { id } = request.params;
    const product = request.body;

    if (!id) {
      response
        .status(404)
        .json({ message: "El id del producto no puede estar vacio." });
    }

    const productById = await ProductModel.getProductById({ id });
    if (!productById) {
      response.status(404).json({ message: "Producto no encontrado." });
    }

    await ProductModel.updateProductById({ id, product });

    response.status(200).json({ message: "Producto actualizado con éxito." });
  }
}
