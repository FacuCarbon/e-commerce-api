import { Request, Response } from "express";
import { UserModel } from "../models/user-model";
import { User } from "../types/types";

export class UserController {
  static async getAllUsers(request: Request, response: Response) {
    try {
      const querySearch = request.query.search as string | undefined;
      const queryRole = request.query.role as string | undefined;
      const users = await UserModel.getAllUsers({
        search: querySearch,
        role: queryRole,
      });
      response.status(200).json({
        count: users.length,
        users,
      });
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      response
        .status(500)
        .json({ error: "Error al obtener todos los usuarios" });
    }
  }
  /////////////////////////////////
  static async getUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        response
          .status(400)
          .json({ message: "El id del usuario no puede estar vacio." });
      }

      const user = await UserModel.getUserById({ id });

      if (!user) {
        response.status(404).json({ message: "Usuario no encontrado." });
      }

      response.status(200).json(user);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      response.status(500).json({ error: "Error al obtener usuario" });
    }
  }
  /////////////////////////////////
  static async createUser(request: Request, response: Response) {
    try {
      const user = request.body;
      const newUser = await UserModel.createUser(user);
      if (!newUser?.id) {
        response.status(500).json({ message: "Error al crear el usuario." });
      }
      response.status(201).json({
        message: "Usuario creado con éxito.",
        user: newUser,
      });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      response.status(500).json({ error: "Error al crear usuario" });
    }
  }
  /////////////////////////////////
  static async updateUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = request.body;

      if (!id) {
        response
          .status(404)
          .json({ message: "El id del usuario no puede estar vacio." });
      }

      const userById = await UserModel.getUserById({ id });
      if (!userById) {
        response.status(404).json({ message: "Usuario no encontrado." });
      }

      await UserModel.updateUserById({ id, user });

      response.status(200).json({ message: "Usuario actualizado con éxito." });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      response.status(500).json({ error: "Error al actualizar usuario" });
    }
  }
  /////////////////////////////////
  static async deleteUser(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        response
          .status(404)
          .json({ message: "El id del usuario no puede estar vacio." });
      }

      const userById = await UserModel.getUserById({ id });
      if (!userById) {
        response.status(404).json({ message: "Usuario no encontrado." });
      }

      await UserModel.deleteUserById({ id });

      response.status(200).json({ message: "Usuario eliminado con éxito." });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      response.status(500).json({ error: "Error al eliminar usuario" });
    }
  }
}
