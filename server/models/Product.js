import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["Living Room", "Bedroom", "Kitchen", "Other"],
    },
    stock: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
