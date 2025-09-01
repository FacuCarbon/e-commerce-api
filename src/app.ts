import express from "express";
import { productsRouter } from "./routes/product-routes";
import { corsMiddleware } from "./middlewares/cors";
import { categoriesRouter } from "./routes/category-routes";
import { usersRouter } from "./routes/user-routes";
import { ordersRouter } from "./routes/order-routes";
const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(corsMiddleware());

app.use("/api/products", productsRouter);

app.use("/api/categories", categoriesRouter);

app.use("/api/users", usersRouter);

app.use("/api/orders", ordersRouter);

export default app;
