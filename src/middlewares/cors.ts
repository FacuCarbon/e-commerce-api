// src/middlewares/cors.ts
import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://logibuy-frontend.vercel.app",
  "www.logibuy-frontend.vercel.app",
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Si la petición no tiene origin (Postman o servidor), permitir
    if (!origin) return callback(null, true);

    // Si el origin está en la lista, permitir
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    // Si no está permitido, rechazar
    callback(new Error("CORS policy: Origin not allowed"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
