const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subCategories: {
      type: [String],
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

export const CategoryModel = mongoose.model("category", CategorySchema);
