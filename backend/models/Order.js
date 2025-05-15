import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: Array,
  customer: {
    email: String,
    name: String,
    street: String,
    "postal-code": String,
    city: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
