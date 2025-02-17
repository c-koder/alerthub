const express = require("express");
const { getNotifications } = require("../controllers/notification.controller");

const { protect } = require("../../middleware/authMiddleware");
const router = express.Router();

// Route to get notifications for user
router.get("/", protect, getNotifications);

module.exports = router;
