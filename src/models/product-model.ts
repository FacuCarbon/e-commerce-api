import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/client";
interface FiltersProduct {
  categoryId?: number;
  sortPrice?: "asc" | "desc";
}

export class ProductModel {
  static async getAll({ categoryId, sortPrice }: FiltersProduct) {
    return await prisma.product.findMany({
      where: categoryId ? { categoryId } : undefined,
      orderBy: sortPrice ? { price: sortPrice } : undefined,
      include: { category: true },
    });
  }

  static async getProductById({ id }: { id: string }) {
    return await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  static async createProduct(data: Omit<Prisma.ProductCreateInput, "id">) {
    return await prisma.product.create({
      data,
    });
  }

  static async deleteProductById({ id }: { id: string }) {
    return await prisma.product.delete({
      where: { id },
    });
  }

  static async updateProductById({
    id,
    product,
  }: {
    id: string;
    product: Partial<Omit<Prisma.ProductUpdateInput, "id">>;
  }) {
    return await prisma.product.update({
      where: { id },
      data: product,
    });
  }
}
