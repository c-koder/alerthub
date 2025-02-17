const express = require("express");
const { body, param } = require("express-validator");
const {
  createCommunity,
  joinCommunity,
  listCommunities,
  getCommunity,
} = require("../controllers/community.controller");

const { protect } = require("../../middleware/authMiddleware");

const router = express.Router();

// Route to create a new community
router.post(
  "/create",
  protect,
  [
    body("name").notEmpty().withMessage("Community name is required"),
    body("description")
      .notEmpty()
      .withMessage("Community description is required"),
    body("city").notEmpty().withMessage("Community city is required"),
    body("district").notEmpty().withMessage("Community district is required"),
    body("isPublic")
      .isBoolean()
      .withMessage("Community visibility is required"),
  ],
  createCommunity
);

// Route to join an existing community
router.post(
  "/join",
  protect,
  [body("communityId").notEmpty().withMessage("Community ID is required")],
  joinCommunity
);

// Route to list all communities
router.get("/", listCommunities);

// Route to get a community by code
router.get(
  "/:code",
  [param("code").notEmpty().withMessage("Code is required")],
  getCommunity
);

module.exports = router;
