import { Order } from "./order-types";

export type PaymentStatus = "pending" | "approved" | "rejected";

export interface Payment {
  id: number;
  orderId: number;
  methodId: number;
  status: PaymentStatus;
  transactionId: string | null;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  order: Order;
  method: PaymentMethod;
}

export interface PaymentMethod {
  id: number;
  name: string;
  payments: Payment[];
}
