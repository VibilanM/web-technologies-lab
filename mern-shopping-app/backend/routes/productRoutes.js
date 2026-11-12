import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers["x-user-email"];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: Unauthenticated users cannot access product data directly. Please login first."
    });
  }

  next();
};

router.get("/", requireAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No products available in the store."
      });
    }

    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products."
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { productId, productName, productPrice, category, quantity, description } = req.body;

    if (!productId || !productName || productPrice === undefined || !category || quantity === undefined || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all product details: productId, productName, productPrice, category, quantity, description."
      });
    }

    const newProduct = new Product({
      productId,
      productName,
      productPrice: Number(productPrice),
      category,
      quantity: Number(quantity),
      description
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: savedProduct
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `Product with productId '${req.body.productId}' already exists.`
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create product."
    });
  }
});

export default router;

