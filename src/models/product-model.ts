import { readJson, writeJson } from "../utils/read-json";
import { randomUUID } from "node:crypto";
import { Product } from "../types/product-types";

interface FiltersProduct {
  category?: string;
  sortPrice?: "asc" | "desc";
}

export class ProductModel {
  static async getAll({ category, sortPrice }: FiltersProduct) {
    const products: Product[] = await readJson();
    if (category) {
      const productsCategory = products?.filter(
        (product) => product?.category === category
      );
      return productsCategory;
    }

    if (sortPrice) {
      const productsSortPrice = products?.sort((a, b) =>
        sortPrice === "asc" ? a?.price - b?.price : b?.price - a?.price
      );
      return productsSortPrice;
    }

    return products;
  }

  //
  static async getProductById({ id }: { id: string }) {
    const products: Product[] = await readJson();
    const product = products?.find((product) => product?.id === id);

    return product;
  }

  //
  static async createProduct(product: Omit<Product, "id">) {
    const products: Product[] = await readJson();
    const newProduct = {
      id: randomUUID(),
      ...product,
    };
    products?.push(newProduct);
    await writeJson(products);
    return newProduct;
  }

  //

  static async deleteProductById({ id }: { id: string }) {
    const products: Product[] = await readJson();
    const index = products?.findIndex((product) => product?.id === id);
    if (index === -1) {
      return;
    }
    products?.splice(index, 1);
    await writeJson(products);
  }

  //

  static async updateProductById({
    id,
    product,
  }: {
    id: string;
    product: Partial<Omit<Product, "id">>;
  }) {
    const products: Product[] = await readJson();
    const index = products.findIndex((p) => p?.id === id);

    if (index === -1) return;

    const existingProduct = products[index];

    const updatedProduct = {
      ...existingProduct,
      ...product,
    };

    products[index] = updatedProduct;

    await writeJson(products);

    return updatedProduct;
  }
}
