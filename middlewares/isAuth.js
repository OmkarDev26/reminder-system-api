import jwt from "jsonwebtoken";
import usersModel from "../models/auth.js";

export default async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return res.status(401).send("Unauthorized");
  }

  const token = tokenHeader.split(" ")[1];

  const matchToken = await usersModel().findOne({ token });
  if (!matchToken) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(410).send("Unauthorized");
    }

    req.tokenInfo = decoded;
    req.token = token;
    next();
  });
};
