const nodemailer = require('nodemailer');
const logger = require('./logger.util');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };

    const result = await transporter.sendMail(mailOptions);
    logger.info(`Email sent successfully to ${to}`);
    return result;
  } catch (error) {
    logger.error(`Failed to send email: ${error.message}`);
    throw error;
  }
};

module.exports = { sendEmail };