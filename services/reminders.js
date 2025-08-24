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
        user: req.currentUser._id,
        userRef: `reminder_system_users`,
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

remindersServices.updateReminder = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!req.body.title || !req.body.description || !req.body.time) {
        return reject({
          code: 400,
          message: "Missing required fields",
        });
      }
      const checkReminder = await remindersModel().findOne({
        _id: req.body.id,
        notified: "success",
      });

      if (checkReminder) {
        return reject({
          code: 500,
          message: "Reminder has already notified",
        });
      }

      await remindersModel().updateOne(
        { _id: req.body.id },
        {
          title: req.body.title,
          description: req.body.description,
          remindAt: req.body.time,
        }
      );
      resolve({
        code: 201,
        message: "Reminder Updated!!",
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
      const reminders = await remindersModel()
        .find({
          user: req.currentUser._id,
        })
        .sort({ remindAt: -1 });
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
remindersServices.deleteReminder = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const reminders = await remindersModel().deleteOne({
        _id: req.body.id,
      });
      resolve({
        code: 200,
        message: "Reminder Deleted",
      });
    } catch (error) {
      console.log(error);
      reject({
        code: 500,
        message: "Error occurred while deleting reminders",
      });
    }
  });
};

remindersServices.analytics = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const analytics = await remindersModel().aggregate([
        {
          $match: {
            user: req.currentUser._id,
          },
        },
        {
          $group: {
            _id: "$notified",
            count: {
              $sum: 1,
            },
            name: {
              $first: "$notified",
            },
          },
        },
      ]);
      resolve({
        code: 200,
        data: analytics,
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
