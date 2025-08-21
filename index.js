import express from "express";

const app = express();

app.use(express.json());
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./db.js";
await connectDB();

import routes from "./routes/index.js";

app.use("/api", routes);

import reminderCron from "./services/cronjob.js";

reminderCron();

app.listen(3000, () => {
  console.log("Server started running port: 3000");
});
