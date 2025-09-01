import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:57031",
  "http://localhost:1234",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3003",
  "https://e-commerce-api-production-0e59.up.railway.app",
  "https://logibuy-frontend.vercel.app",
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // permitir requests sin origin (ej: Postman, server-to-server)
    if (!origin) return callback(null, true);

    // permitir si está en la whitelist
    if (ACCEPTED_ORIGINS.includes(origin)) return callback(null, true);

    // bloquear CORS sin lanzar error 500
    console.warn("Blocked CORS request from origin:", origin);
    return callback(null, false);
  },
});
