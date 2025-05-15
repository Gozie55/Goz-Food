// models/Meal.js
import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  description: String,
  image: String,
});

export default mongoose.model("Meal", mealSchema);
