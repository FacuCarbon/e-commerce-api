import { Request, Response } from "express";
import { CategoryModel } from "../models/category-model";

export class CategoryController {
  static async getAllCategories(request: Request, response: Response) {
    try {
      const nameFilter = request.query.name as string | undefined;
      const parentIdFilter = request.query.parentId
        ? parseInt(request.query.parentId as string)
        : undefined;

      // Pasar filtros al model
      const categories = await CategoryModel.getAllCategories({
        name: nameFilter,
        parentId: parentIdFilter,
      });

      response.status(200).json({
        count: categories.length,
        categories,
      });
    } catch (error) {
      console.error("Error al obtener todas las categorías:", error);
      response
        .status(500)
        .json({ error: "Error al obtener todas las categorías" });
    }
  }

  /////////////////////////////////
  static async getCategoryById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        response
          .status(400)
          .json({ message: "El id de la categoría no puede estar vacio." });
      }

      const category = await CategoryModel.getCategoryById({
        id: parseInt(id),
      });

      if (!category) {
        response.status(404).json({ message: "Categoría no encontrada." });
      }

      response.status(200).json(category);
    } catch (error) {
      console.error("Error al obtener categoría:", error);
      response.status(500).json({ error: "Error al obtener categoría" });
    }
  }
  /////////////////////////////////
  static async createCategory(request: Request, response: Response) {
    try {
      const category = request.body;
      const newCategory = await CategoryModel.createCategory(category);
      if (!newCategory?.id) {
        response.status(500).json({ message: "Error al crear la categoría." });
      }
      response.status(201).json({
        message: "Categoría creada con éxito.",
        category: newCategory,
      });
    } catch (error) {
      console.error("Error al crear categoría:", error);
      response.status(500).json({ error: "Error al crear categoría" });
    }
  }
  /////////////////////////////////
  static async updateCategory(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const category = request.body;

      if (!id) {
        response
          .status(404)
          .json({ message: "El id de la categoría no puede estar vacio." });
      }

      const categoryById = await CategoryModel.getCategoryById({
        id: parseInt(id),
      });
      if (!categoryById) {
        response.status(404).json({ message: "Categoría no encontrada." });
      }

      await CategoryModel.updateCategoryById({ id: parseInt(id), category });

      response
        .status(200)
        .json({ message: "Categoría actualizada con éxito." });
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      response.status(500).json({ error: "Error al actualizar categoría" });
    }
  }
  /////////////////////////////////
  static async deleteCategory(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        response
          .status(404)
          .json({ message: "El id de la categoría no puede estar vacio." });
      }

      const categoryById = await CategoryModel.getCategoryById({
        id: parseInt(id),
      });
      if (!categoryById) {
        response.status(404).json({ message: "Categoría no encontrada." });
      }

      await CategoryModel.deleteCategoryById({ id: parseInt(id) });

      response.status(200).json({ message: "Categoría eliminada con éxito." });
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      response.status(500).json({ error: "Error al eliminar categoría" });
    }
  }
}
