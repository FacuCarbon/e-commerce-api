"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFirebaseToken = void 0;
const admin_1 = __importDefault(require("../firebase/admin"));
const verifyFirebaseToken = async (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        response.status(401).json({ message: "Token de usuario no proporcionado" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await admin_1.default.auth().verifyIdToken(token);
        request.user = decodedToken;
        next();
    }
    catch (error) {
        console.error("Error al verificar token:", error);
        response.status(401).json({ message: "Token inválido" });
        return;
    }
};
exports.verifyFirebaseToken = verifyFirebaseToken;
