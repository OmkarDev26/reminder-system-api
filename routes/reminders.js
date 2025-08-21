import express from "express";

const router = express.Router();

import remindersServices from "../services/reminders.js";

import isAuth from "../middlewares/isAuth.js";

router.post("/get", isAuth, async (req, res) => {
  try {
    const data = await remindersServices.getReminder(req);
    res.status(data.code).send(data);
  } catch (error) {
    console.log("Get reminders error:", error);
    res.status(error.code).send(error.message);
  }
});

router.post("/create", isAuth, async (req, res) => {
  try {
    const data = await remindersServices.createReminder(req);
    res.status(data.code).send(data);
  } catch (error) {
    console.log("Get reminders error:", error);
    res.status(error.code).send(error.message);
  }
});

export default router;
