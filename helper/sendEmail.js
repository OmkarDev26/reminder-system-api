import nodemailer from "nodemailer";

export default (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "omkardevrukhkar0@gmail.com",
          pass: process.env.PASS,
        },
      });

      const output = `
                  <div style="font-family: Helvetica,Arial,sans-serif;">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <p>Hi,</p>
                <p>${data?.message}</p>
              </div>
            </div>`;

      let mailOptions = {
        to: data?.email, // list of receivers
        subject: `Reminder for ${data?.title}`, // Subject line
        html: output, // html body
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) reject(error);
        if (info) resolve("Mail Sent");
      });
    } catch (error) {
      reject(error);
    }
  });
};
