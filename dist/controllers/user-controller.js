"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_model_1 = require("../models/user-model");
class UserController {
    static async getAllUsers(request, response) {
        try {
            const querySearch = request.query.search;
            const queryRole = request.query.role;
            const users = await user_model_1.UserModel.getAllUsers({
                search: querySearch,
                role: queryRole,
            });
            response.status(200).json({
                count: users.length,
                users,
            });
        }
        catch (error) {
            console.error("Error al obtener todos los usuarios:", error);
            response
                .status(500)
                .json({ error: "Error al obtener todos los usuarios" });
        }
    }
    /////////////////////////////////
    static async getUserById(request, response) {
        try {
            const { id } = request.params;
            if (!id) {
                response
                    .status(400)
                    .json({ message: "El id del usuario no puede estar vacio." });
            }
            const user = await user_model_1.UserModel.getUserById({ id });
            if (!user) {
                response.status(404).json({ message: "Usuario no encontrado." });
            }
            response.status(200).json(user);
        }
        catch (error) {
            console.error("Error al obtener usuario:", error);
            response.status(500).json({ error: "Error al obtener usuario" });
        }
    }
    /////////////////////////////////
    static async createUser(request, response) {
        try {
            const user = request.body;
            const newUser = await user_model_1.UserModel.createUser(user);
            if (!newUser?.id) {
                response.status(500).json({ message: "Error al crear el usuario." });
            }
            response.status(201).json({
                message: "Usuario creado con éxito.",
                user: newUser,
            });
        }
        catch (error) {
            console.error("Error al crear usuario:", error);
            response.status(500).json({ error: "Error al crear usuario" });
        }
    }
    /////////////////////////////////
    static async updateUser(request, response) {
        try {
            const { id } = request.params;
            const user = request.body;
            if (!id) {
                response
                    .status(404)
                    .json({ message: "El id del usuario no puede estar vacio." });
            }
            const userById = await user_model_1.UserModel.getUserById({ id });
            if (!userById) {
                response.status(404).json({ message: "Usuario no encontrado." });
            }
            await user_model_1.UserModel.updateUserById({ id, user });
            response.status(200).json({ message: "Usuario actualizado con éxito." });
        }
        catch (error) {
            console.error("Error al actualizar usuario:", error);
            response.status(500).json({ error: "Error al actualizar usuario" });
        }
    }
    /////////////////////////////////
    static async deleteUser(request, response) {
        try {
            const { id } = request.params;
            if (!id) {
                response
                    .status(404)
                    .json({ message: "El id del usuario no puede estar vacio." });
            }
            const userById = await user_model_1.UserModel.getUserById({ id });
            if (!userById) {
                response.status(404).json({ message: "Usuario no encontrado." });
            }
            await user_model_1.UserModel.deleteUserById({ id });
            response.status(200).json({ message: "Usuario eliminado con éxito." });
        }
        catch (error) {
            console.error("Error al eliminar usuario:", error);
            response.status(500).json({ error: "Error al eliminar usuario" });
        }
    }
}
exports.UserController = UserController;
