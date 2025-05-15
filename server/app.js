import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import { connectToDatabase } from "./db.js";
import Meal from "./models/Meal.js";
import Order from "./models/Order.js";

const app = express();

// Connect to MongoDB using the URI from .env
await connectToDatabase(process.env.MONGODB_URI);

app.use(bodyParser.json());

// ✅ Allow frontend to connect (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // For production, use your frontend URL instead
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ✅ API routes
app.get("/meals", async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: "Failed to load meals" });
  }
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (
    !orderData ||
    !orderData.items?.length ||
    !orderData.customer?.email?.includes("@") ||
    !orderData.customer?.name?.trim() ||
    !orderData.customer?.street?.trim() ||
    !orderData.customer["postal-code"]?.trim() ||
    !orderData.customer?.city?.trim()
  ) {
    return res.status(400).json({
      message: "Missing or invalid order/customer data.",
    });
  }

  try {
    const newOrder = new Order(orderData);
    await newOrder.save();
    res.status(201).json({ message: "Order created!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order." });
  }
});

// ✅ Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
