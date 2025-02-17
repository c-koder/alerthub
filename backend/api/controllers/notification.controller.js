const User = require("../models/user.model");
const Notification = require("../models/notification.model");

const { logMessage } = require("../../utils/logger");

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user._id);

    if (!user) {
      return res.status(404).json({ data: "User not found" });
    }

    const notifications = await Notification.find({
      receivers: { $in: [user._id] },
    })
      .populate("user", "_id username email phoneNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: notifications });
  } catch (error) {
    logMessage(
      "error",
      "getNotifications",
      error.message,
      `/api/notifications/${req.session?.user?._id}`
    );
    next(error);
  }
};

module.exports = {
  getNotifications,
};
