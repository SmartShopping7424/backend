const { configure, getLogger } = require("log4js");

const environment = {
  nodeEnv: process.env.ENV || process.env.NODE_ENV,
  logDir: process.env.LOG_DIR || "logs",
  logLevel: process.env.LOG_LEVEL || "info",
  logFile: process.env.LOG_FILE || "app.log",
};

configure({
  appenders: {
    console: { type: "stdout", layout: { type: "colored" } },
    dateFile: {
      type: "dateFile",
      filename: `${environment.logDir}/${environment.logFile}`,
      layout: { type: "basic" },
      compress: true,
      daysToKeep: 14,
      keepFileExt: true,
    },
  },
  categories: {
    default: {
      appenders: ["console", "dateFile"],
      level: environment.logLevel,
    },
  },
});

const logger = getLogger();

module.exports = { logger };
