import { prisma } from "../prisma/client";
import { Category } from "../types/category-types";

interface CategoryFilters {
  name?: string;
  parentId?: number;
}
export class CategoryModel {
  static async getAllCategories(filters?: CategoryFilters) {
    const { name, parentId } = filters || {};
    return await prisma.category.findMany({
      where: {
        ...(name && { name: { contains: name, mode: "insensitive" } }),
        ...(parentId !== undefined && { parentId }),
      },
      include: { parent: true, children: true },
    });
  }
  /////////////////////////////////
  static async getCategoryById({
    id,
  }: {
    id: number;
  }): Promise<Category | null> {
    return await prisma.category.findUnique({
      where: { id },
      include: { parent: true },
    });
  }
  /////////////////////////////////
  static async getCategoryByName(name: string): Promise<Category | null> {
    return await prisma.category.findUnique({
      where: { name },
      include: { parent: true },
    });
  }
  /////////////////////////////////
  static async createCategory({
    name,
    parentId,
  }: {
    name: string;
    parentId?: number;
  }) {
    try {
      return await prisma.category.create({
        data: { name, parentId },
      });
    } catch (error) {
      console.error("Error creando categoría:", error);
      throw error;
    }
  }

  /////////////////////////////////
  static async updateCategoryById({
    id,
    category,
  }: {
    id: number;
    category: string;
  }) {
    return await prisma.category.update({
      where: { id },
      data: {
        name: category,
      },
    });
  }
  /////////////////////////////////

  static async deleteCategoryById({ id }: { id: number }) {
    return await prisma.category.delete({
      where: { id },
    });
  }
}
