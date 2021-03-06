const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema(
  {
    name: {
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

export const BrandModel = mongoose.model("brand", BrandSchema);
