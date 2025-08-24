import express from "express";

const router = express.Router();

import remindersServices from "../services/reminders.js";
import middlewares from "../middlewares/index.js";

router.post(
  "/get",
  middlewares.isAuth,
  middlewares.attachCurrentUser,
  async (req, res) => {
    try {
      const data = await remindersServices.getReminder(req);
      res.status(data.code).send(data);
    } catch (error) {
      console.log("Get reminders error:", error);
      res.status(error.code).send(error.message);
    }
  }
);

router.post(
  "/create",
  middlewares.isAuth,
  middlewares.attachCurrentUser,
  async (req, res) => {
    try {
      const data = await remindersServices.createReminder(req);
      res.status(data.code).send(data);
    } catch (error) {
      console.log("Get reminders error:", error);
      res.status(error.code).send(error.message);
    }
  }
);

router.post(
  "/update",
  middlewares.isAuth,
  middlewares.attachCurrentUser,
  async (req, res) => {
    try {
      const data = await remindersServices.updateReminder(req);
      res.status(data.code).send(data);
    } catch (error) {
      console.log("Get reminders error:", error);
      res.status(error.code).send(error.message);
    }
  }
);

router.post(
  "/delete",
  middlewares.isAuth,
  middlewares.attachCurrentUser,
  async (req, res) => {
    try {
      const data = await remindersServices.deleteReminder(req);
      res.status(data.code).send(data);
    } catch (error) {
      console.log("Get reminders error:", error);
      res.status(error.code).send(error.message);
    }
  }
);

router.post(
  "/analytics",
  middlewares.isAuth,
  middlewares.attachCurrentUser,
  async (req, res) => {
    try {
      const data = await remindersServices.analytics(req);
      res.status(data.code).send(data);
    } catch (error) {
      console.log("Get reminders error:", error);
      res.status(error.code).send(error.message);
    }
  }
);

export default router;
