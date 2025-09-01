"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const client_1 = require("../prisma/client");
class UserModel {
    static async getAllUsers({ search, role }) {
        const users = await client_1.prisma.user.findMany({
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
    static async getUserById({ id }) {
        const user = await client_1.prisma.user.findUnique({
            where: { id },
        });
        return user;
    }
    /////////////////////////////////
    static async createUser(data) {
        return await client_1.prisma.user.create({
            data: {
                ...data,
                role: data?.email === "facundocarbon2015@gmail.com" ? "admin" : "user",
            },
        });
    }
    /////////////////////////////////
    static async updateUserById({ id, user }) {
        return await client_1.prisma.user.update({
            where: { id },
            data: user,
        });
    }
    /////////////////////////////////
    static async deleteUserById({ id }) {
        return await client_1.prisma.user.delete({
            where: { id },
        });
    }
}
exports.UserModel = UserModel;
