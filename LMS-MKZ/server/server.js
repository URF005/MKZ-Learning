// server.js
import { createServer } from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { connectDb } from "./database/db.js";
import { v2 as cloudinary } from "cloudinary";

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Define port and environment
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";

// Connect Database
connectDb();

// Create and run the HTTP server
const server = createServer(app);

server.listen(port, () => {
    console.log(
        `✅ LMS Server running at http://localhost:${port} in ${dev ? "development" : "production"
        } mode`
    );
});
