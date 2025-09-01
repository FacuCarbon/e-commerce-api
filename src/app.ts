import express from "express";
import { productsRouter } from "./routes/product-routes";
import { corsMiddleware } from "./middlewares/cors";
import { categoriesRouter } from "./routes/category-routes";
import { usersRouter } from "./routes/user-routes";
import { ordersRouter } from "./routes/order-routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.disable("x-powered-by");

app.use(express.json());

// 🔹 CORS antes de las rutas
app.use(corsMiddleware);

// Opcional: permitir OPTIONS global
app.options("*", corsMiddleware);

// 🔹 Rutas
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);

// 🔹 Error handler al final
app.use(errorHandler);

export default app;
