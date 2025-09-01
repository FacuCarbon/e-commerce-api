"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const client_1 = require("../prisma/client");
class CategoryModel {
    static async getAllCategories(filters) {
        const { name, parentId } = filters || {};
        return await client_1.prisma.category.findMany({
            where: {
                ...(name && { name: { contains: name, mode: "insensitive" } }),
                ...(parentId !== undefined && { parentId }),
            },
            include: { parent: true, children: true },
        });
    }
    /////////////////////////////////
    static async getCategoryById({ id, }) {
        return await client_1.prisma.category.findUnique({
            where: { id },
            include: { parent: true },
        });
    }
    /////////////////////////////////
    static async getCategoryByName(name) {
        return await client_1.prisma.category.findUnique({
            where: { name },
            include: { parent: true },
        });
    }
    /////////////////////////////////
    static async createCategory({ name, parentId, }) {
        try {
            return await client_1.prisma.category.create({
                data: { name, parentId },
            });
        }
        catch (error) {
            console.error("Error creando categoría:", error);
            throw error;
        }
    }
    /////////////////////////////////
    static async updateCategoryById({ id, category, }) {
        return await client_1.prisma.category.update({
            where: { id },
            data: {
                name: category,
            },
        });
    }
    /////////////////////////////////
    static async deleteCategoryById({ id }) {
        return await client_1.prisma.category.delete({
            where: { id },
        });
    }
}
exports.CategoryModel = CategoryModel;
