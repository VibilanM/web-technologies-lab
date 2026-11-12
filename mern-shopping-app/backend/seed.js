import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const sampleProducts = [
  {
    productId: "P101",
    productName: "Sony WH-1000XM4 Headphones",
    productPrice: 19990,
    category: "Electronics",
    quantity: 25,
    description: "Industry-leading noise canceling with dual noise sensor technology and 30-hour battery life."
  },
  {
    productId: "P102",
    productName: "Apple MacBook Air M2",
    productPrice: 99900,
    category: "Computers",
    quantity: 12,
    description: "13.6-inch Liquid Retina Display, 8-Core CPU, 8GB Unified Memory, 256GB SSD storage."
  },
  {
    productId: "P103",
    productName: "Keychron K2 Mechanical Keyboard",
    productPrice: 7499,
    category: "Accessories",
    quantity: 30,
    description: "75% layout wireless mechanical keyboard with RGB backlighting and tactile switches."
  },
  {
    productId: "P104",
    productName: "Logitech MX Master 3S Mouse",
    productPrice: 8995,
    category: "Accessories",
    quantity: 18,
    description: "Performance wireless ergonomic mouse with 8K DPI tracking and Quiet Clicks."
  },
  {
    productId: "P105",
    productName: "Samsung 32-inch 4K Monitor",
    productPrice: 28499,
    category: "Displays",
    quantity: 8,
    description: "UHD resolution curved monitor with 1 billion colors and eye-saver mode."
  },
  {
    productId: "P106",
    productName: "Stainless Steel Insulated Flask",
    productPrice: 1499,
    category: "Lifestyle",
    quantity: 50,
    description: "Double-wall vacuum insulated bottle with leak-proof lid, keeps drinks cold for 24h."
  }
];

export const seedProductsIfEmpty = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(sampleProducts);
      console.log("Sample products automatically seeded into MongoDB.");
    }
  } catch (err) {
    console.error("Auto-seeding error:", err.message);
  }
};

// Allow running directly via: node seed.js
if (process.argv[1].endsWith("seed.js")) {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_shopping_app";
  mongoose
    .connect(MONGO_URI)
    .then(async () => {
      console.log("Connected to MongoDB for manual seeding.");
      await Product.deleteMany({});
      await Product.insertMany(sampleProducts);
      console.log("Products collection successfully seeded with sample data!");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error seeding products:", err);
      process.exit(1);
    });
}

