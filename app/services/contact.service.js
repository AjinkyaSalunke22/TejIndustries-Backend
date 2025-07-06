const { sendEmail } = require('../utils/email.util');
const logger = require('../utils/logger.util');

const sendContactEmail = async (contactData) => {
  try {
    const { name, email, mobile } = contactData;
    
    const subject = 'New TejIndustry Services Inquiry';
    const html = `
      <h2>Service Inquiry Request</h2>
      <p>${name} has requested a call back for your service.</p>
      <p>Here are the user's details:</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${mobile}</p>
      <p>Thank you.</p>
    `;

    await sendEmail(process.env.EMAIL_USER, subject, html);
    logger.info('Contact form email sent successfully');
    
    return { success: true, message: 'Contact form submitted successfully' };
  } catch (error) {
    logger.error(`Contact service error: ${error.message}`);
    throw error;
  }
};

module.exports = { sendContactEmail };