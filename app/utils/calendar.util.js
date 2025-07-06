const { google } = require('googleapis');
const path = require('path');
const logger = require('./logger.util');

const createCalendarEvent = async (eventData) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../../tejindustries-service-account.json'),
      scopes: ['https://www.googleapis.com/auth/calendar']
    });

    const calendar = google.calendar({ version: 'v3', auth });
    
    const { name, mobile, date, time } = eventData;
    const startDateTime = new Date(`${date}T${time}:00+05:30`); // IST timezone
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour duration

    const event = {
      summary: `Call Back - ${name}`,
      description: `Scheduled call back for ${name}\nMobile: ${mobile}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Asia/Kolkata'
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Asia/Kolkata'
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 30 },
          { method: 'popup', minutes: 10 }
        ]
      }
    };

    const result = await calendar.events.insert({
      calendarId: process.env.EMAIL_USER,
      resource: event
    });

    logger.info(`Calendar event created: ${result.data.id}`);
    return result.data;
  } catch (error) {
    logger.error(`Calendar event creation failed: ${error.message}`);
    throw error;
  }
};

module.exports = { createCalendarEvent };