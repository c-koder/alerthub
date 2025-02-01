const winston = require("winston");
const path = require("path");
const fs = require("fs");

const { combine, timestamp, printf } = winston.format;

const logsDir = path.join(__dirname, "../logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFormat = printf(({ level, timestamp, who, what, where }) => {
  return `[${timestamp}] [${level.toUpperCase()}] [${where}] [${who}] - ${what}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss UTC" }), logFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"),
    }),
  ],
});

const logMessage = (level, who, what, where) => {
  logger.log(level, { who, what, where });
};

module.exports = { logger, logMessage };
