const { validationResult } = require("express-validator");

const Community = require("../models/community.model");
const User = require("../models/user.model");

const { logMessage } = require("../../utils/logger");

// @desc Helper function to generate a random community code
const generateCommunityCode = () => {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
};

// @desc    Create a new community
// @route   POST /api/communities/create
// @access  Private
const createCommunity = async (req, res, next) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    return res.status(400).json({ data: errorMessage });
  }

  const { name, description, city, district, isPublic } = req.body;

  try {
    // Check if a community with the same name already exists
    const existingCommunity = await Community.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });
    if (existingCommunity) {
      return res.status(400).json({ data: "Community already exists" });
    }

    // Create the community; set the current user as the manager and add to members list.
    const community = await Community.create({
      name,
      description,
      isPublic: isPublic !== undefined ? isPublic : true,
      location: { city, district },
      manager: req.session.user._id,
      members: [req.session.user._id],
      code: generateCommunityCode(),
    });

    await User.findByIdAndUpdate(req.session.user._id, {
      $push: { communities: community._id },
    });

    logMessage(
      "info",
      "createCommunity",
      "Community created successfully",
      "/api/communities/create"
    );
    res.status(201).json({ data: community });
  } catch (error) {
    logMessage(
      "error",
      "createCommunity",
      error.message,
      "/api/communities/create"
    );
    next(error);
  }
};

// @desc    Join an existing community
// @route   POST /api/communities/join
// @access  Private
const joinCommunity = async (req, res, next) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((err) => err.msg)
      .join(", ");
    return res.status(400).json({ data: errorMessage });
  }

  const { communityId } = req.body;

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ data: "Community not found" });
    }

    // Prevent duplicate membership
    if (community.members.includes(req.session.user._id)) {
      return res
        .status(400)
        .json({ data: "User is already a member of this community" });
    }

    // For simplicity, automatically join the community (even if private, you can later add approval logic)
    community.members.push(req.session.user._id);
    await community.save();

    // Update user's communities
    const user = await User.findById(req.session.user._id);
    user.communities.push(communityId);
    await user.save();

    logMessage(
      "info",
      "joinCommunity",
      "User joined community successfully",
      "/api/communities/join"
    );
    res.status(200).json({ data: community });
  } catch (error) {
    logMessage(
      "error",
      "joinCommunity",
      error.message,
      "/api/communities/join"
    );
    next(error);
  }
};

// @desc    List all communities (or you could filter by user membership)
// @route   GET /api/communities
// @access  Private
const listCommunities = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user._id);

    if (!user) {
      return res.status(404).json({ data: "User not found" });
    }

    // Fetch communities for the user's district
    const communities = await Community.find({
      "location.district": user.district,
    }).populate("manager", "_id username email");

    res.status(200).json({ data: communities });
  } catch (error) {
    logMessage("error", "listCommunities", error.message, "/api/communities");
    next(error);
  }
};

// @desc    Get a community by code
// @route   GET /api/communities/:code
// @access  Public
const getCommunity = async (req, res, next) => {
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
    const community = await Community.findOne({ code }).populate([
      "incidents",
      { path: "members", select: "_id username email phoneNumber" },
    ]);

    if (!community) {
      return res.status(404).json({ data: "Community not found" });
    }

    res.status(200).json({ data: community });
  } catch (error) {
    logMessage(
      "error",
      "getCommunity",
      error.message,
      "/api/communities/:code"
    );
    next(error);
  }
};

module.exports = {
  createCommunity,
  joinCommunity,
  listCommunities,
  getCommunity,
};
