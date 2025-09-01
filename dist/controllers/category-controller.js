"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_model_1 = require("../models/category-model");
class CategoryController {
    static async getAllCategories(request, response) {
        try {
            const nameFilter = request.query.name;
            const parentIdFilter = request.query.parentId
                ? parseInt(request.query.parentId)
                : undefined;
            // Pasar filtros al model
            const categories = await category_model_1.CategoryModel.getAllCategories({
                name: nameFilter,
                parentId: parentIdFilter,
            });
            response.status(200).json({
                count: categories.length,
                categories,
            });
        }
        catch (error) {
            console.error("Error al obtener todas las categorías:", error);
            response
                .status(500)
                .json({ error: "Error al obtener todas las categorías" });
        }
    }
    /////////////////////////////////
    static async getCategoryById(request, response) {
        try {
            const { id } = request.params;
            if (!id) {
                response
                    .status(400)
                    .json({ message: "El id de la categoría no puede estar vacio." });
            }
            const category = await category_model_1.CategoryModel.getCategoryById({
                id: parseInt(id),
            });
            if (!category) {
                response.status(404).json({ message: "Categoría no encontrada." });
            }
            response.status(200).json(category);
        }
        catch (error) {
            console.error("Error al obtener categoría:", error);
            response.status(500).json({ error: "Error al obtener categoría" });
        }
    }
    /////////////////////////////////
    static async createCategory(request, response) {
        try {
            const category = request.body;
            const newCategory = await category_model_1.CategoryModel.createCategory(category);
            if (!newCategory?.id) {
                response.status(500).json({ message: "Error al crear la categoría." });
            }
            response.status(201).json({
                message: "Categoría creada con éxito.",
                category: newCategory,
            });
        }
        catch (error) {
            console.error("Error al crear categoría:", error);
            response.status(500).json({ error: "Error al crear categoría" });
        }
    }
    /////////////////////////////////
    static async updateCategory(request, response) {
        try {
            const { id } = request.params;
            const category = request.body;
            if (!id) {
                response
                    .status(404)
                    .json({ message: "El id de la categoría no puede estar vacio." });
            }
            const categoryById = await category_model_1.CategoryModel.getCategoryById({
                id: parseInt(id),
            });
            if (!categoryById) {
                response.status(404).json({ message: "Categoría no encontrada." });
            }
            await category_model_1.CategoryModel.updateCategoryById({ id: parseInt(id), category });
            response
                .status(200)
                .json({ message: "Categoría actualizada con éxito." });
        }
        catch (error) {
            console.error("Error al actualizar categoría:", error);
            response.status(500).json({ error: "Error al actualizar categoría" });
        }
    }
    /////////////////////////////////
    static async deleteCategory(request, response) {
        try {
            const { id } = request.params;
            if (!id) {
                response
                    .status(404)
                    .json({ message: "El id de la categoría no puede estar vacio." });
            }
            const categoryById = await category_model_1.CategoryModel.getCategoryById({
                id: parseInt(id),
            });
            if (!categoryById) {
                response.status(404).json({ message: "Categoría no encontrada." });
            }
            await category_model_1.CategoryModel.deleteCategoryById({ id: parseInt(id) });
            response.status(200).json({ message: "Categoría eliminada con éxito." });
        }
        catch (error) {
            console.error("Error al eliminar categoría:", error);
            response.status(500).json({ error: "Error al eliminar categoría" });
        }
    }
}
exports.CategoryController = CategoryController;
