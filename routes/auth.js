import express from "express";

const router = express.Router();

import authServices from "../services/auth.js";

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

export default router;
