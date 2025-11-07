import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  color: String,
  images: [String]
}, { timestamps: true });

const VariantSchema = new mongoose.Schema({
  storage: Number,
  ram: Number
});

const ProductSchema = new mongoose.Schema({
  p_name: { type: String, required: true },
  p_desc: { type: String, required: true },
  p_price: { type: String, required: true },
  p_images: [ImageSchema],
  p_varients: [VariantSchema],
  soldBy: { type: String, required: true },
  screenSize: String
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
