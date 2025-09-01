import { Request, Response, NextFunction } from "express";
import admin from "../firebase/admin";

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const verifyFirebaseToken = async (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    response.status(401).json({ message: "Token de usuario no proporcionado" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    request.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    response.status(401).json({ message: "Token inválido" });
    return;
  }
};
