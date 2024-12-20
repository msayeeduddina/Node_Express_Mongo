const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { execFileSync } = require("child_process");

const logEvent = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}'\n'}`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      fsPromises.appendFile(
        path.join(__dirname, "..", "logs", logName),
        logItem
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res) => {
  logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method}${req.path}`);
  nextDay();
};
module.exports = { logEvent, logger };
