require("dotenv").config();

const express = require("express");
const http = require("http");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const router = require("./api/routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const server = http.createServer(app);

connectDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", router);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
