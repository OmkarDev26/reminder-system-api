import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected!!");
  } catch (error) {
    console.log("Error connecting to DB: ", error);
    process.exit(1);
  }
};
