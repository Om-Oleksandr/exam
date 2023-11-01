
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'error.txt');
let logArray = [];

if (fs.existsSync(logFilePath)) {
  const data = fs.readFileSync(logFilePath, 'utf8');
  if (data !== '') {
    try {
      logArray = JSON.parse(data);
    } catch (error) {
      throw new Error('Error parsing');
    }
  }
}

module.exports = (err, req, res, next) => {
  const stackTraceLines = err.stack.split('\n');

  const stackTrace = stackTraceLines.slice(1).map(line => {
    const match = line.match(/at\s(.+)\s\((.+):(\d+):(\d+)\)/);
    if (match) {
      const [, functionName, filePath, lineNumber, columnNumber] = match;
      return {
        functionName: functionName.trim(),
        filePath: filePath.trim(),
        lineNumber: parseInt(lineNumber),
        columnNumber: parseInt(columnNumber),
      };
    } else {
      return line.trim();
    }
  });
  const logMessage = {
    message: err.message,
    time: new Date().getTime(),
    code: err.code,
    stackTrace,
  };
  logArray.push(logMessage);

  fs.writeFile(
    logFilePath,
    JSON.stringify(logArray, null, 2),
    { flag: 'w' },
    error => {
      if (error) console.error('Error writing to error log:', error);
    },
  );

  next(err);
};
