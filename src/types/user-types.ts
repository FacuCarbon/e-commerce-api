import { Order } from "./types";
export type UserRole = "user" | "admin";
export interface UserBase {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  role: UserRole;
}

export interface User extends UserBase {
  role: UserRole;
  orders: Order[];
  createdAt: Date;
}
