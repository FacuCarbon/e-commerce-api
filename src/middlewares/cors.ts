// src/middlewares/cors.ts
import cors from "cors";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://logibuy-frontend.vercel.app",
  "https://www.logibuy-frontend.vercel.app",
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman o servidores internos
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    console.warn("CORS denied for origin:", origin);
    return callback(new Error("CORS policy: Origin not allowed"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false, // **Importante**: Express 5 requiere esto
  optionsSuccessStatus: 204, // Devuelve 204 a las preflights OPTIONS
});
