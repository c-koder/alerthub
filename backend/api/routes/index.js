// routes/index.js
const router = require("express").Router();

const AuthRoutes = require("./auth.routes");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.use("/auth", AuthRoutes);

module.exports = router;
