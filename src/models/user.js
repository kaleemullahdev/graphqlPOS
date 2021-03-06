const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    fullname: { type: String, required: true },
    type: {
      type: String,
      // required: true,
      enum: ["admin", "vendor"],
      default: "vendor",
    },
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

export const UserModel = mongoose.model("user", UserSchema);
