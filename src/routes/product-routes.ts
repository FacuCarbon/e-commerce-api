import { Router } from "express";
import { ProductController } from "../controllers/product-controller";
import { verifyFirebaseToken } from "../middlewares/auth.middleware";

export const productsRouter = Router();

productsRouter.get("/", ProductController.getAll);

productsRouter.post("/", verifyFirebaseToken, ProductController.createProduct);

productsRouter.get("/:id", ProductController.getProduct);

productsRouter.patch(
  "/:id",
  verifyFirebaseToken,
  ProductController.updateProduct
);

productsRouter.delete(
  "/:id",
  verifyFirebaseToken,
  ProductController.deleteProduct
);
