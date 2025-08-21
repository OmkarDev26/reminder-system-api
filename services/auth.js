import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { randomBytes } from "crypto";
import validator from "validator";
import usersModel from "../models/auth.js";

const authServices = {};

authServices.signup = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!validator.isEmail(req.body.email)) {
        return reject({
          code: 400,
          message: "Invalid Email Address",
        });
      }
      const userCheck = await usersModel().findOne({
        email: req.body.email,
      });

      if (userCheck) {
        return reject({ code: 402, message: "User Already Exists." });
      }

      const salt = randomBytes(32);
      const hashedPwd = await argon2.hash(req.body.password, { salt });
      const payload = {
        ...req.body,
        password: hashedPwd,
      };
      await usersModel().create(payload);
      return resolve({ code: 201, message: "Registered! Please Login.." });
    } catch (error) {
      console.log(error, "ERRP");
      reject({
        code: 500,
        message: "An error occurred during login",
        error: error,
      });
    }
  });
};

authServices.login = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!validator.isEmail(req.body.email)) {
        return reject({
          code: 400,
          message: "Invalid Email Address",
        });
      }
      const checkUser = await usersModel()
        .findOne({
          email: req.body.email.toLowerCase(),
        })
        .select({ token: 0 });
      if (!checkUser) {
        return reject({ code: 404, message: "User not registered" });
      }

      const checkPassword = await argon2.verify(
        checkUser.password,
        req.body.password
      );
      if (checkPassword) {
        const jwtToken = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // for an hr
            data: checkUser,
          },
          process.env.JWT_SECRET
        );
        await usersModel().updateOne(
          { _id: checkUser._id },
          { token: jwtToken }
        );
        const safeUser = checkUser.toObject();
        delete safeUser.password;
        return resolve({ code: 200, token: jwtToken, user: safeUser });
      } else return reject({ code: 404, message: "Invalid Credentials" });
    } catch (error) {
      console.log(error, "ooo");
      return reject({
        code: 500,
        message: "An error occurred during login.",
        error: error.message,
      });
    }
  });
};

export default authServices;
