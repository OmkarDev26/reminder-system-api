import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

export default function (community = "reminder_system") {
  return mongoose.model(`${community}_users`, userSchema);
}
