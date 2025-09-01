import { Order } from "../types/types";
import { prisma } from "../prisma/client";

export class OrderModel {
  static async getAllOrders() {
    const orders = await prisma.order.findMany();
    return orders;
  }
  /////////////////////////////////
  static async getOrderById({ id }: { id: number }) {
    const order = await prisma.order.findUnique({
      where: { id },
    });
    return order;
  }
  /////////////////////////////////
  static async createOrder(data: Order) {
    return await prisma.order.create({
      data: {
        userId: data.userId,
        status: data.status,
        total: data.total,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        payment: data.payment
          ? {
              create: {
                methodId: data.payment.methodId,
                status: data.payment.status,
                transactionId: data.payment.transactionId,
                amount: data.payment.amount,
              },
            }
          : undefined,
      },
    });
  }
  /////////////////////////////////
  static async updateOrderById({ id, order }: { id: number; order: Order }) {
    return await prisma.order.update({
      where: { id },
      data: {
        status: order.status,
        total: order.total,
        items: {
          update: order.items.map((item) => ({
            where: { id: item.id },
            data: {
              quantity: item.quantity,
              price: item.price,
            },
          })),
        },
        payment: order.payment
          ? {
              update: {
                status: order.payment.status,
                transactionId: order.payment.transactionId,
                amount: order.payment.amount,
              },
            }
          : undefined,
      },
    });
  }
  /////////////////////////////////
  static async deleteOrderById({ id }: { id: number }) {
    return await prisma.order.delete({
      where: { id },
    });
  }
}
