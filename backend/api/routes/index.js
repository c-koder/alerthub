// routes/index.js
const router = require("express").Router();

const AuthRoutes = require("./auth.routes");
const CommunityRoutes = require("./community.routes");
const IncidentRoutes = require("./incident.routes");
const NotificationRoutes = require("./notification.routes");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.use("/auth", AuthRoutes);
router.use("/communities", CommunityRoutes);
router.use("/incidents", IncidentRoutes);
router.use("/notifications", NotificationRoutes);

module.exports = router;
