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
                <p>Use the following link to reset your password.</p>
                <p>The link will expire after 5 minutes.</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${data?.message}</h2>
              </div>
            </div>`;

      let mailOptions = {
        to: data?.email, // list of receivers
        subject: data?.title, // Subject line
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
