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

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (acceptedOrigins.includes(origin)) return callback(null, true);
      console.warn("Blocked CORS request from origin:", origin);
      return callback(null, false);
    },
  });
