import { UserBase } from "../types/types";
import { prisma } from "../prisma/client";

interface FiltersUser {
  search?: string;
  role?: string;
}
export class UserModel {
  static async getAllUsers({ search, role }: FiltersUser) {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          { role: role },
        ],
      },
    });

    return users;
  }
  /////////////////////////////////
  static async getUserById({ id }: { id: string }) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
  /////////////////////////////////
  static async createUser(data: UserBase) {
    return await prisma.user.create({
      data: {
        ...data,
        role: data?.email === "facundocarbon2015@gmail.com" ? "admin" : "user",
      },
    });
  }

  /////////////////////////////////

  static async updateUserById({ id, user }: { id: string; user: UserBase }) {
    return await prisma.user.update({
      where: { id },
      data: user,
    });
  }
  /////////////////////////////////
  static async deleteUserById({ id }: { id: string }) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
