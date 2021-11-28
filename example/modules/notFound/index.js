const StatusCodes = require("../../constants/StatusCodes");

const notFoundHandler = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Route was not found" });
};

module.exports = notFoundHandler;
