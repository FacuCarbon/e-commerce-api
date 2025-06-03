import { Router } from "express";
import { ProductController } from "../controllers/product-controller";

export const productsRouter = Router();

productsRouter.get("/", ProductController.getAll);

productsRouter.post("/", ProductController.createProduct);

productsRouter.get("/:id", ProductController.getProduct);

productsRouter.patch("/:id", ProductController.updateProduct);

productsRouter.delete("/:id", ProductController.deleteProduct);
