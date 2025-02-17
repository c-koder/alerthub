require("dotenv").config();

const express = require("express");
const http = require("http");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const { socketConnection } = require("./utils/socket");

const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const router = require("./api/routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const server = http.createServer(app);

socketConnection(server);
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

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    },
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
