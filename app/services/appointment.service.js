const { sendEmail } = require('../utils/email.util');
const { createCalendarEvent } = require('../utils/calendar.util');
const logger = require('../utils/logger.util');

const scheduleAppointment = async (appointmentData) => {
  try {
    const { name, email, mobile, date, time } = appointmentData;
    
    // Send email notification
    const subject = 'New TejIndustry Services Appointment Request';
    const html = `
      <h2>Appointment Request</h2>
      <p>${name} has requested an appointment for your service.</p>
      <p>Here are the appointment details:</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${mobile}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p>Thank you.</p>
    `;

    await sendEmail(process.env.EMAIL_USER, subject, html);
    
    // Create calendar event
    await createCalendarEvent({ name, mobile, date, time });
    
    logger.info('Appointment scheduled successfully');
    return { success: true, message: 'Appointment scheduled successfully' };
  } catch (error) {
    logger.error(`Appointment service error: ${error.message}`);
    throw error;
  }
};

module.exports = { scheduleAppointment };