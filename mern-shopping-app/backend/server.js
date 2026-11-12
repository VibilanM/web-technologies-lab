import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes, { loginHandler } from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { seedProductsIfEmpty } from "./seed.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-user-email"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Exercise-8: MERN Shopping App API is running."
  });
});

app.use("/api/users", userRoutes);
app.post("/api/login", loginHandler);
app.use("/api/products", productRoutes);

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_shopping_app";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected successfully");
    await seedProductsIfEmpty();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

export default app;