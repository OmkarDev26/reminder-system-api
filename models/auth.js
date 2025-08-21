import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    email: { type: String },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

export default function (community = "reminder_system") {
  return mongoose.model(`${community}_user`, userSchema);
}
