"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const client_1 = require("../prisma/client");
class OrderModel {
    static async getAllOrders() {
        const orders = await client_1.prisma.order.findMany();
        return orders;
    }
    /////////////////////////////////
    static async getOrderById({ id }) {
        const order = await client_1.prisma.order.findUnique({
            where: { id },
        });
        return order;
    }
    /////////////////////////////////
    static async createOrder(data) {
        return await client_1.prisma.order.create({
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
    static async updateOrderById({ id, order }) {
        return await client_1.prisma.order.update({
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
    static async deleteOrderById({ id }) {
        return await client_1.prisma.order.delete({
            where: { id },
        });
    }
}
exports.OrderModel = OrderModel;
