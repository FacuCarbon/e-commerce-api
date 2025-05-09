import readJson from "../utils/read-json";
import { randomUUID } from "node:crypto";
import { Product } from "../types/product-types";

const products: Product[] = readJson("./products.json");

export class ProductModel {
  static async getAll({ category }: { category?: string }) {
    if (category) {
      const productsCategory = products?.filter(
        (product) => product?.category === category
      );
      return productsCategory;
    }

    return products;
  }

  static async getProductById({ id }: { id: string }) {
    const product = products?.find((product) => product?.id === id);
    return product;
  }
}
