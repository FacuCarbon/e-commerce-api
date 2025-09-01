"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = require("./routes/product-routes");
const cors_1 = require("./middlewares/cors");
const category_routes_1 = require("./routes/category-routes");
const user_routes_1 = require("./routes/user-routes");
const order_routes_1 = require("./routes/order-routes");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use(express_1.default.json());
// 🔹 CORS antes de las rutas
app.use(cors_1.corsMiddleware);
// Opcional: permitir OPTIONS global
app.options("*", cors_1.corsMiddleware);
// 🔹 Rutas
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use("/api/products", product_routes_1.productsRouter);
app.use("/api/categories", category_routes_1.categoriesRouter);
app.use("/api/users", user_routes_1.usersRouter);
app.use("/api/orders", order_routes_1.ordersRouter);
// 🔹 Error handler al final
app.use(errorHandler_1.errorHandler);
exports.default = app;
