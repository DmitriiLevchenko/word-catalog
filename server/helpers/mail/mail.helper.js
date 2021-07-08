import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class MailHelper {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(email, activatedLink) {

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Account activated on ${process.env.APP_NAME} ${process.env.APP_URL}`,
      text: "",
      html: `<div><h1>Activet your account by link:</h1><a href="${activatedLink}">Link</a></div>`,
    });
  }
}

export const mailHelper = new MailHelper();
