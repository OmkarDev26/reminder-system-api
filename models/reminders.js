import mongoose, { Schema } from "mongoose";

const reminders_schema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    remindAt: { type: Date },
    user: { type: Schema.Types.ObjectId, refPath: "userRef" },
    userRef: { type: String },
    notified: {
      type: String,
      default: "pending",
      enum: ["pending", "success", "failed"],
    },
  },
  {
    timestamps: true,
  }
);

export default function (project = "reminder_system") {
  return mongoose.model(`${project}_reminders`, reminders_schema);
}
