import { Router } from "express";
import { ProductController } from "../controllers/product-controller";

export const productsRouter = Router();

productsRouter.get("/", ProductController.getAll);
