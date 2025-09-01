import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
interface ProductJson {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  stock: number;
  rating: number;
  category: string;
}

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, "..", "products.json");

  const jsonData = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(jsonData) as ProductJson[];

  const categoryMap = new Map<string, number>();

  // Crear categorías únicas
  const uniqueCategories = [
    ...new Set(products.map((p: ProductJson) => p.category)),
  ];

  for (const name of uniqueCategories as string[]) {
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
