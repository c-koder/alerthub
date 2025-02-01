const { logger } = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error({
    who: "errorHandler",
    what: err.message,
    where: req.originalUrl,
  });
  res.status(500).json({ data: "Server error" });
};

module.exports = errorHandler;
