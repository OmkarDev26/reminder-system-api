import userModel from "../models/auth.js";
import mongoose from "mongoose";

export default async function attachCurrentUser(req, res, next) {
  const userDetails = await userModel(req.headers["community-name"]).findOne({
    token: req.token,
  });

  if (userDetails) {
    req.currentUser = userDetails;
    next();
  } else {
    return res.status(401).send("Unauthorized");
  }
}
