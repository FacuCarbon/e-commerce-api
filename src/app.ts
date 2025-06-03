import express from "express";
import { productsRouter } from "./routes/product-routes";
import { corsMiddleware } from "./middlewares/cors";
const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(corsMiddleware());

app.use("/api/products", productsRouter);

export default app;
