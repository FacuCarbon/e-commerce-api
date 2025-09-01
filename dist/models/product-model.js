"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const client_1 = require("../prisma/client");
class ProductModel {
    static async getAll({ categoryId, sortPrice }) {
        return await client_1.prisma.product.findMany({
            where: categoryId ? { categoryId } : undefined,
            orderBy: sortPrice ? { price: sortPrice } : undefined,
            include: { category: true },
        });
    }
    static async getProductById({ id }) {
        return await client_1.prisma.product.findUnique({
            where: { id },
            include: { category: true },
        });
    }
    static async createProduct(data) {
        return await client_1.prisma.product.create({
            data,
        });
    }
    static async deleteProductById({ id }) {
        return await client_1.prisma.product.delete({
            where: { id },
        });
    }
    static async updateProductById({ id, product, }) {
        return await client_1.prisma.product.update({
            where: { id },
            data: product,
        });
    }
}
exports.ProductModel = ProductModel;
