import express from "express";

const router = express.Router();

import auth from "./auth.js";
import reminders from "./reminders.js";

router.get("/", (req, res) => {
  res.send("Base route");
});

router.use("/auth", auth);
router.use("/reminders", reminders);

export default router;
