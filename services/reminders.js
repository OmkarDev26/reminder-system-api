import remindersModel from "../models/reminders.js";
import usersModel from "../models/auth.js";
const remindersServices = {};

remindersServices.createReminder = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.title || !req.body.description || !req.body.time) {
        return reject({
          code: 400,
          message: "Missing required fields",
        });
      }
      await remindersModel().create({
        title: req.body.title,
        description: req.body.description,
        remindAt: req.body.time,
        user: req.tokenInfo?.data?._id,
        userRef: `reminder_system_users`,
        userEmail: req.tokenInfo?.data?.email,
      });
      resolve({
        code: 201,
        message: "Reminder Set!!",
      });
    } catch (error) {
      console.log(error);
      reject({
        code: 500,
        message: "Error occurred while creating a reminder",
      });
    }
  });
};

remindersServices.getReminder = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(req.tokenInfo);
      const reminders = await remindersModel().find({
        user: req.tokenInfo?.data?._id,
      });
      resolve({
        code: 200,
        data: reminders,
      });
    } catch (error) {
      console.log(error);
      reject({
        code: 500,
        message: "Error occurred while getting reminders",
      });
    }
  });
};

export default remindersServices;
