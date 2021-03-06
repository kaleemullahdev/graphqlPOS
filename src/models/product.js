const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    categoryId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    brandId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    images: {
      type: [String],
      default: [],
    },
    mainImage: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

export const ProductModel = mongoose.model("product", ProductSchema);
