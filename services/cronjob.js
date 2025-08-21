import cron from "node-cron";
import remindersModel from "../models/reminders.js";
import sendEmailNotifications from "../helper/sendEmail.js";

const sendReminders = () => {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    try {
      const reminders = await remindersModel().find({
        remindAt: { $lte: now },
        notified: false,
      });

      if (reminders.length === 0) {
        console.log("no reminders at:", now);
        return;
      }

      for (const reminder of reminders) {
        const reminderDetails = {
          email: reminder.userEmail,
          title: reminder.title,
          message: reminder.description,
        };
        console.log(reminderDetails, "DETAILS");
        await sendEmailNotifications(reminderDetails);
        reminder.notified = true;
        reminder.save();
        console.log("Send for user: ", reminderDetails.email);
      }
    } catch (error) {
      console.log("Cron Job Failed: ", error);
    }
  });
  console.log("Cron Job Started: ", new Date());
};

export default sendReminders;
