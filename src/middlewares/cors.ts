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
      console.log("CORS origin:", origin);
      if (origin && acceptedOrigins?.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS."));
    },
  });
