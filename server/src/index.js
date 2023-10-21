const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
require('./dbMongo/mongoose');
const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');
const errorLogger = require('./errorLogs/logger');
const { transformAndCopyFile } = require('./errorLogs/copyLogs');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(errorLogger);
app.use(handlerError);

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
controller.createConnection(server);

const currentDate = new Date();
const dailyExecutionTime = '12:00:00';
const intervalMilliseconds = 24 * 60 * 60 * 1000; // 24 години
const timeUntilNextExecution =
  new Date(
    `${currentDate.toDateString()} ${dailyExecutionTime} GMT+03:00`
  ).getTime() +
  intervalMilliseconds -
  Date.now();

if (timeUntilNextExecution < 0) {
  transformAndCopyFile();
} else {
  setTimeout(() => transformAndCopyFile(), timeUntilNextExecution);
}
