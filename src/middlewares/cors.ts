// src/middlewares/cors.ts
import cors from "cors";

export const corsMiddleware = cors({
  origin: "*", // permite cualquier origen
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
