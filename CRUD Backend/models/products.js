const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  percentage: { type: Number }, // Added percentage field
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  thumbnailImage: { type: String },
  galleryImages: [{ type: String }],
  quantity: { type: Number, required: true },
  ratings: [
    {
      star: Number,
      comment: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
      createdAt: String, // Changed to String type
    },
  ],
  sold: { type: Number, default: 0, select: false },
  totalratings: { type: Number, default: 0 },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
