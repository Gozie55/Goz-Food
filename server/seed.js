import mongoose from "mongoose";
import Meal from "./models/Meal.js";
import fs from "node:fs/promises";

const data = await fs.readFile("./data/available-meals.json", "utf8");
const meals = JSON.parse(data);

await mongoose.connect("mongodb://localhost:27017/gozfood");

await Meal.insertMany(meals);
console.log("Meals seeded!");
process.exit();
