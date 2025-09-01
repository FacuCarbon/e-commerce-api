import cors from "cors";

// Lista de orígenes permitidos
const ACCEPTED_ORIGINS = [
  "http://localhost:57031",
  "http://localhost:1234",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3003",
  "https://logibuy-frontend.vercel.app",
];

// Middleware de CORS
export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Peticiones sin 'origin' (Postman, curl, navegador directo) se permiten
    if (!origin) return callback(null, true);

    // Permitir si el origen está en la lista
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    // Si no coincide, devolver error CORS
    console.warn("Bloqueado por CORS, origin:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true, // permite cookies o headers de autenticación
});
