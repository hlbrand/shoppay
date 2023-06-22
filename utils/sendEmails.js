import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

// Create reusable transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: email,
    pass: pass,
  },
});

export async function sendActivationEmail(userEmail, activationLink) {
  try {
    let info = await transporter.sendMail({
      from: '"Shopay App" <your-email@gmail.com>', // sender address
      to: userEmail, // list of receivers
      subject: 'Activate Your Shopay Account', // Subject line
      html: `
        <p>Thank you for signing up for our app!</p>
        <p>Please activate your account by clicking the following link:</p>
        <a href="${activationLink}">${activationLink}</a>
      `, // HTML content
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.log(error);
  }
}

export async function resetEmail(userEmail, resetLink) {
  try {
    let info = await transporter.sendMail({
      from: '"Shopay App" <your-email@gmail.com>', // sender address
      to: userEmail, // list of receivers
      subject: 'Reset Your Shopay Password', // Subject line
      html: `
        <a href="${resetLink}">${resetLink}</a>
      `, // HTML content
    });
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.log(error);
  }
}
