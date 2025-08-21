import mongoose, { Schema } from "mongoose";

const reminders_schema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    remindAt: { type: Date },
    user: { type: Schema.Types.ObjectId, refPath: "userPath" },
    userPath: { type: String },
    notified: { type: Boolean, default: false },
    userEmail: { type: String },
  },
  {
    timestamps: true,
  }
);

export default function (project = "reminder_system") {
  return mongoose.model(`${project}_reminders`, reminders_schema);
}
