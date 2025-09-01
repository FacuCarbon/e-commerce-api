// src/middlewares/cors.ts
import cors from "cors";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://logibuy-frontend.vercel.app",
  "https://www.logibuy-frontend.vercel.app",
];

// Configuración de CORS
export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Peticiones sin origin (Postman, servidores internos) se permiten
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    console.warn("CORS denied for origin:", origin);
    return callback(new Error("CORS policy: Origin not allowed"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // importante si tu frontend envía cookies o auth headers
});
