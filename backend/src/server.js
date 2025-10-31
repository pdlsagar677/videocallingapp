import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

// Enhanced CORS for development
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow all origins in development, or specific ones
      const allowedOrigins = [
        "http://localhost:5173",
        "http://192.168.1.74:5173",
        /\.*/, // Allow any origin in development
      ];
      
      if (!origin || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        if (allowedOrigins.some(pattern => {
          if (typeof pattern === 'string') return origin === pattern;
          if (pattern instanceof RegExp) return pattern.test(origin);
          return false;
        })) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Accessible via:
    Local: http://localhost:${PORT}
    Network: http://192.168.1.74:${PORT}
    Your mobile: http://[YOUR-PC-IP]:${PORT}`);
  connectDB();
});