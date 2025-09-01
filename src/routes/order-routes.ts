import { Router } from "express";
import { OrderController } from "../controllers/order-controller";
import { verifyFirebaseToken } from "../middlewares/auth.middleware";

export const ordersRouter = Router();

ordersRouter.get("/", OrderController.getAllOrders);

ordersRouter.get("/:id", OrderController.getOrderById);

ordersRouter.post("/", verifyFirebaseToken, OrderController.createOrder);

ordersRouter.patch(
  "/:id",
  verifyFirebaseToken,
  OrderController.updateOrderById
);

ordersRouter.delete(
  "/:id",
  verifyFirebaseToken,
  OrderController.deleteOrderById
);
