"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
async function main() {
    const filePath = path_1.default.join(__dirname, "..", "products.json");
    const jsonData = fs_1.default.readFileSync(filePath, "utf-8");
    const products = JSON.parse(jsonData);
    const categoryMap = new Map();
    // Crear categorías únicas
    const uniqueCategories = [
        ...new Set(products.map((p) => p.category)),
    ];
    for (const name of uniqueCategories) {
        const category = await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        categoryMap.set(name, category.id);
    }
    // Insertar productos
    for (const product of products) {
        await prisma.product.create({
            data: {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                discount: product.discount,
                image: product.image,
                stock: product.stock,
                rating: product.rating,
                category: {
                    connect: { id: categoryMap.get(product.category) },
                },
            },
        });
    }
    console.log("✅ Productos y categorías insertados con éxito");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
