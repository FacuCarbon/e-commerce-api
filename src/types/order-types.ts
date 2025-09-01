import { Payment } from "./payment-types";
import { Product, User } from "./types";
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
export interface Order {
  id: number;
  userId: string;
  user: User;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  payment: Payment | null;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: string;
  quantity: number;
  price: number;
  order: Order;
  product: Product;
}
