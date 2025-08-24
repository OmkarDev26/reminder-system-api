import express from "express";

const router = express.Router();

import authServices from "../services/auth.js";
import middlewares from "../middlewares/index.js";

router.post("/signup", async (req, res) => {
  try {
    const data = await authServices.signup(req);
    res.status(data.code || 200).send(data);
  } catch (error) {
    console.log("Signup Error: ", error);
    res.status(error.code).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = await authServices.login(req);
    res.status(data.code || 200).send(data);
  } catch (error) {
    res.status(error.code).send(error.message);
  }
});

router.post(
  "/logout",
  middlewares.isAuth,
  middlewares.attachCurrentUser,
  async (req, res) => {
    try {
      const data = await authServices.logout(req);
      res.status(data.code || 200).send(data);
    } catch (error) {
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
      const data = await authServices.update(req);
      res.status(data.code || 200).send(data);
    } catch (error) {
      res.status(error.code).send(error.message);
    }
  }
);

export default router;
