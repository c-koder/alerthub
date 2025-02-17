const { validationResult } = require("express-validator");

const Incident = require("../models/incident.model");
const Community = require("../models/community.model");
const Notification = require("../models/notification.model");
const User = require("../models/user.model");

const { logMessage } = require("../../utils/logger");
const { emitNewNotification } = require("../../utils/socket");

// @desc    Create a new incident
// @route   POST /api/incidents/create
// @access  Private
const createIncident = async (req, res, next) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    return res.status(400).json({ data: errorMessage });
  }

  const { title, category, images, description, code } = req.body;

  try {
    // Check if an incident with the same name already exists
    const existingIncident = await Incident.findOne({
      title: new RegExp(`^${title}$`, "i"),
    });
    if (existingIncident) {
      return res.status(400).json({ data: "Incident already exists" });
    }

    const community = await Community.findOne({ code });
    if (!community) {
      return res.status(400).json({ data: "Community not found" });
    }

    // Create the incident
    const incident = await Incident.create({
      title,
      category,
      images: images || [],
      description,
      user: req.session.user._id,
      community: community._id,
    });

    community.incidents.push(incident._id);

    await community.save();

    const notification = {
      title: `New incident created in ${community.name}`,
      user: req.session.user._id,
      content: `${incident.title} has been created in your community.`,
      read: false,
      receivers: community.members,
    };

    await Notification.create(notification);

    community.members.forEach((member) => {
      emitNewNotification(member.toString(), notification);
    });

    logMessage(
      "info",
      "createIncident",
      "Incident created successfully and added to the community.",
      "/api/incidents/create"
    );

    res.status(201).json({ data: incident });
  } catch (error) {
    logMessage(
      "error",
      "createIncident",
      error.message,
      "/api/incidents/create"
    );
    next(error);
  }
};

// @desc    List all incidents
// @route   GET /api/incidents
// @access  Private
const getIncidents = async (req, res, next) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    return res.status(400).json({ data: errorMessage });
  }

  const code = req.params.code;

  try {
    const user = await User.findById(req.session.user._id);

    if (!user) {
      return res.status(404).json({ data: "User not found" });
    }

    const community = await Community.findOne({ code });
    if (!community) {
      return res.status(400).json({ data: "Community not found" });
    }

    const incidents = await Incident.find({
      community: community._id,
    }).populate("user", "_id username email phoneNumber");

    res.status(200).json({ data: incidents });
  } catch (error) {
    logMessage(
      "error",
      "getIncidents",
      error.message,
      `/api/incidents/${req.params.code}`
    );
    next(error);
  }
};

module.exports = {
  createIncident,
  getIncidents,
};
