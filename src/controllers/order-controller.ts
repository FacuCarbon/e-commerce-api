import { Request, Response } from "express";
import { OrderModel } from "../models/order-model";

export class OrderController {
  static async getAllOrders(_: Request, response: Response) {
    try {
      const orders = await OrderModel.getAllOrders();
      response.status(200).json({
        count: orders?.length,
        orders,
      });
    } catch (error) {
      console.error("Error al obtener todos los pedidos:", error);
      response
        .status(500)
        .json({ error: "Error al obtener todos los pedidos" });
    }
  }
  /////////////////////////////////
  static async getOrderById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        response
          .status(400)
          .json({ message: "El id del pedido no puede estar vacio." });
      }

      const order = await OrderModel.getOrderById({ id: parseInt(id) });

      if (!order) {
        response.status(404).json({ message: "Pedido no encontrado." });
      }

      response.status(200).json(order);
    } catch (error) {
      console.error("Error al obtener pedido:", error);
      response.status(500).json({ error: "Error al obtener pedido" });
    }
  }
  /////////////////////////////////
  static async createOrder(request: Request, response: Response) {
    try {
      const order = request.body;
      const newOrder = await OrderModel.createOrder(order);
      if (!newOrder?.id) {
        response.status(500).json({ message: "Error al crear el pedido." });
      }
      response.status(201).json({
        message: "Pedido creado con éxito.",
        order: newOrder,
      });
    } catch (error) {
      console.error("Error al crear pedido:", error);
      response.status(500).json({ error: "Error al crear pedido" });
    }
  }
  /////////////////////////////////
  static async updateOrderById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const order = request.body;

      if (!id) {
        response
          .status(404)
          .json({ message: "El id del pedido no puede estar vacio." });
      }
      const thisId = parseInt(id);
      const orderById = await OrderModel.getOrderById({ id: thisId });
      if (!orderById) {
        response.status(404).json({ message: "Pedido no encontrado." });
      }

      await OrderModel.updateOrderById({ id: thisId, order });

      response.status(200).json({ message: "Pedido actualizado con éxito." });
    } catch (error) {
      console.error("Error al actualizar pedido:", error);
      response.status(500).json({ error: "Error al actualizar pedido" });
    }
  }
  /////////////////////////////////
  static async deleteOrderById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        response
          .status(404)
          .json({ message: "El id del pedido no puede estar vacio." });
      }
      const thisId = parseInt(id);

      const orderById = await OrderModel.getOrderById({ id: thisId });
      if (!orderById) {
        response.status(404).json({ message: "Pedido no encontrado." });
      }

      await OrderModel.deleteOrderById({ id: thisId });

      response.status(200).json({ message: "Pedido eliminado con éxito." });
    } catch (error) {
      console.error("Error al eliminar pedido:", error);
      response.status(500).json({ error: "Error al eliminar pedido" });
    }
  }
}
