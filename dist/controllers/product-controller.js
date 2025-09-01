"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_model_1 = require("../models/product-model");
const category_model_1 = require("../models/category-model");
class ProductController {
    static async getAll(request, response) {
        try {
            const categoryName = request.query?.category;
            const sortPrice = request.query?.sortPrice;
            let categoryId;
            if (categoryName) {
                const categoryData = await category_model_1.CategoryModel.getCategoryByName(categoryName);
                if (!categoryData) {
                    response.status(404).json({ error: "Categoría no encontrada" });
                }
                categoryId = categoryData?.id;
            }
            const products = await product_model_1.ProductModel.getAll({ categoryId, sortPrice });
            response.status(200).json({
                count: products.length,
                products,
            });
        }
        catch (error) {
            console.error("Error al obtener todos los productos:", error);
            response
                .status(500)
                .json({ error: "Error al obtener todos los productos" });
        }
    }
    //
    static async getProduct(request, response) {
        try {
            const { id } = request.params;
            if (!id) {
                response
                    .status(400)
                    .json({ message: "El id del producto no puede estar vacio." });
            }
            const product = await product_model_1.ProductModel.getProductById({ id });
            if (!product) {
                response.status(404).json({ message: "Producto no encontrado." });
            }
            response.status(200).json(product);
        }
        catch (error) {
            console.error("Error al obtener producto:", error);
            response.status(500).json({ error: "Error al obtener producto" });
        }
    }
    //
    static async createProduct(request, response) {
        try {
            const product = request.body;
            const newProduct = await product_model_1.ProductModel.createProduct(product);
            if (!newProduct?.id) {
                response.status(500).json({ message: "Error al crear el producto." });
            }
            response.status(201).json({
                message: "Producto creado con éxito.",
                product: newProduct,
            });
        }
        catch (error) {
            console.error("Error al crear producto:", error);
            response.status(500).json({ error: "Error al crear producto" });
        }
    }
    //
    static async deleteProduct(request, response) {
        try {
            const { id } = request.params;
            if (!id) {
                response
                    .status(404)
                    .json({ message: "El id del producto no puede estar vacio." });
            }
            const product = await product_model_1.ProductModel.getProductById({ id });
            if (!product) {
                response.status(404).json({ message: "Producto no encontrado." });
            }
            await product_model_1.ProductModel.deleteProductById({ id });
            response.status(200).json({ message: "Producto eliminado con éxito." });
        }
        catch (error) {
            console.error("Error al eliminar producto:", error);
            response.status(500).json({ error: "Error al eliminar producto" });
        }
    }
    //
    static async updateProduct(request, response) {
        try {
            const { id } = request.params;
            const product = request.body;
            if (!id) {
                response
                    .status(404)
                    .json({ message: "El id del producto no puede estar vacio." });
            }
            const productById = await product_model_1.ProductModel.getProductById({ id });
            if (!productById) {
                response.status(404).json({ message: "Producto no encontrado." });
            }
            await product_model_1.ProductModel.updateProductById({ id, product });
            response.status(200).json({ message: "Producto actualizado con éxito." });
        }
        catch (error) {
            console.error("Error al actualizar producto:", error);
            response.status(500).json({ error: "Error al actualizar producto" });
        }
    }
}
exports.ProductController = ProductController;
