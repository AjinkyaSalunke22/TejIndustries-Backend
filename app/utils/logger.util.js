const winston = require('winston');
const chalk = require('chalk');
const moment = require('moment-timezone');

const timestampFormat = () => {
  return moment().tz('Asia/Kolkata').format('MM-DD-YYYY HH:mm:ss');
};

const levelColorMap = {
  error: chalk.red,
  warn: chalk.yellow,
  info: chalk.cyan,
  http: chalk.magenta,
  verbose: chalk.blue,
  debug: chalk.green,
  silly: chalk.gray,
};

const loggerConfig = {
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: timestampFormat }),
    winston.format.align(),
    winston.format.printf(info => {
      const ts = chalk.blue(info.timestamp);
      const colorFn = levelColorMap[info.level] || chalk.yellow;
      const lvl = colorFn(info.level.toUpperCase());
      const msg = chalk.green(info.message);
      return `[${ts}] ${lvl}: ${msg}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
};

const logger = winston.createLogger(loggerConfig);

process.on('unhandledRejection', (ex) => {
  logger.error('Unhandled Rejection at:', ex);
  process.exit(1);
});

process.on('uncaughtException', (ex) => {
  logger.error('Uncaught Exception at:', ex);
  process.exit(1);
});

module.exports = logger;
