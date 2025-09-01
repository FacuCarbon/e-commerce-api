"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_model_1 = require("../models/order-model");
class OrderController {
    static async getAllOrders(_, response) {
        try {
            const orders = await order_model_1.OrderModel.getAllOrders();
            response.status(200).json({
                count: orders?.length,
                orders,
            });
        }
        catch (error) {
            console.error("Error al obtener todos los pedidos:", error);
            response
                .status(500)
                .json({ error: "Error al obtener todos los pedidos" });
        }
    }
    /////////////////////////////////
    static async getOrderById(request, response) {
        try {
            const { id } = request.params;
            if (!id) {
                response
                    .status(400)
                    .json({ message: "El id del pedido no puede estar vacio." });
            }
            const order = await order_model_1.OrderModel.getOrderById({ id: parseInt(id) });
            if (!order) {
                response.status(404).json({ message: "Pedido no encontrado." });
            }
            response.status(200).json(order);
        }
        catch (error) {
            console.error("Error al obtener pedido:", error);
            response.status(500).json({ error: "Error al obtener pedido" });
        }
    }
    /////////////////////////////////
    static async createOrder(request, response) {
        try {
            const order = request.body;
            const newOrder = await order_model_1.OrderModel.createOrder(order);
            if (!newOrder?.id) {
                response.status(500).json({ message: "Error al crear el pedido." });
            }
            response.status(201).json({
                message: "Pedido creado con éxito.",
                order: newOrder,
            });
        }
        catch (error) {
            console.error("Error al crear pedido:", error);
            response.status(500).json({ error: "Error al crear pedido" });
        }
    }
    /////////////////////////////////
    static async updateOrderById(request, response) {
        try {
            const { id } = request.params;
            const order = request.body;
            if (!id) {
                response
                    .status(404)
                    .json({ message: "El id del pedido no puede estar vacio." });
            }
            const thisId = parseInt(id);
            const orderById = await order_model_1.OrderModel.getOrderById({ id: thisId });
            if (!orderById) {
                response.status(404).json({ message: "Pedido no encontrado." });
            }
            await order_model_1.OrderModel.updateOrderById({ id: thisId, order });
            response.status(200).json({ message: "Pedido actualizado con éxito." });
        }
        catch (error) {
            console.error("Error al actualizar pedido:", error);
            response.status(500).json({ error: "Error al actualizar pedido" });
        }
    }
    /////////////////////////////////
    static async deleteOrderById(request, response) {
        try {
            const { id } = request.params;
            if (!id) {
                response
                    .status(404)
                    .json({ message: "El id del pedido no puede estar vacio." });
            }
            const thisId = parseInt(id);
            const orderById = await order_model_1.OrderModel.getOrderById({ id: thisId });
            if (!orderById) {
                response.status(404).json({ message: "Pedido no encontrado." });
            }
            await order_model_1.OrderModel.deleteOrderById({ id: thisId });
            response.status(200).json({ message: "Pedido eliminado con éxito." });
        }
        catch (error) {
            console.error("Error al eliminar pedido:", error);
            response.status(500).json({ error: "Error al eliminar pedido" });
        }
    }
}
exports.OrderController = OrderController;
