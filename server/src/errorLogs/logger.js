const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const myTransport = new DailyRotateFile({
  filename: 'error-%DATE%.log',
  dirname: 'src/errorLogs/dailyErrors',
  datePattern: 'DD-MM-YYYY',
});

const myFormat = winston.format.printf(err => {
  const stackTraceLines = err.stack.split('\n');
  const stackTrace = stackTraceLines
    .slice(1)
    .map(line => `\n\t\t"${line.trim()}"`);
  return `{ \n\t"message": ${err.message},\n\t"code": ${
    err.code || 500
  },\n\t"time: ${new Date().getTime()}",\n\t"stackTrace": [${stackTrace}\n\t],\n}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(myFormat),
  transports: [myTransport],
});

module.exports = (err, req, res, next) => {
  if (err) {
    logger.error(err);
    return next(err);
  }
  next();
};
