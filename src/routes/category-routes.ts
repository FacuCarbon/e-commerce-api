import { Router } from "express";
import { CategoryController } from "../controllers/category-controller";
import { verifyFirebaseToken } from "../middlewares/auth.middleware";

export const categoriesRouter = Router();

categoriesRouter.get("/", CategoryController.getAllCategories);

categoriesRouter.get("/:id", CategoryController.getCategoryById);

categoriesRouter.post(
  "/",
  verifyFirebaseToken,
  CategoryController.createCategory
);

categoriesRouter.patch(
  "/:id",
  verifyFirebaseToken,
  CategoryController.updateCategory
);

categoriesRouter.delete(
  "/:id",
  verifyFirebaseToken,
  CategoryController.deleteCategory
);
