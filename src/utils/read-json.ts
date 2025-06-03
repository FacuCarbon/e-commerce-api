import { promises as fs } from "fs";
import { Product } from "../types/product-types";

const path = "./products.json";

export async function readJson<T>(): Promise<T> {
  const fileContent = await fs.readFile(path, "utf-8");
  return JSON.parse(fileContent) as T;
}

export async function writeJson(data: Product[]): Promise<void> {
  await fs.writeFile(path, JSON.stringify(data, null, 2), "utf-8");
}
