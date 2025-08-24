import cron from "node-cron";
import remindersModel from "../models/reminders.js";
import usersModel from "../models/auth.js";
import sendEmailNotifications from "../helper/sendEmail.js";

const sendReminders = () => {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    try {
      await usersModel();
      const reminders = await remindersModel()
        .find({
          remindAt: { $lte: now },
          notified: "pending",
        })
        .populate("user");

      if (reminders.length === 0) {
        console.log("no reminders at:", now);
        return;
      }

      console.log(reminders, "CRON");

      const retrySending = async (reminderDetails, attempt = 1) => {
        try {
          await sendEmailNotifications(reminderDetails);
          console.log("Send for user: ", reminderDetails.email);
          return true;
        } catch (error) {
          if (attempt < 3) {
            await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
            return retrySending(reminderDetails, attempt + 1);
          } else {
            console.log(
              `Failed to send reminder after 3 attempts for ${reminderDetails.email}`,
              error
            );
            return false;
          }
        }
      };

      const reminderPromises = reminders.map(async (reminder) => {
        try {
          const reminderDetails = {
            email: reminder.user.email,
            title: reminder.title,
            message: reminder.description,
          };
          const success = await retrySending(reminderDetails);
          if (success) {
            reminder.notified = "success";
            reminder.save();
            console.log("Send for user: ", reminderDetails.email);
          } else {
            reminder.notified = "failed";
            reminder.save();
          }
        } catch (error) {
          console.log("Error send notification: ", error);
        }
      });

      await Promise.allSettled(reminderPromises);
    } catch (error) {
      console.log("Cron Job Failed: ", error);
    }
  });
  console.log("Cron Job Started: ", new Date());
};

export default sendReminders;
