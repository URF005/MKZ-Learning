import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import NodeCache from "node-cache";

import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import miscRoutes from "./routes/miscellaneousRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
export const myCache = new NodeCache();

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1", miscRoutes);
app.use(
  cors({
    origin: "http://mzkdigital.com",
    credentials: true,
  })
);



// ✅ Health check
app.get("/ping", (req, res) => res.send("Server is working ✅"));

// ✅ Serve Frontend (React/Vite build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle all other routes by returning index.html (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// ✅ Error Middleware
app.use(errorMiddleware);

export default app;
