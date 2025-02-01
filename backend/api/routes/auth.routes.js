const express = require("express");
const { body } = require("express-validator");

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
} = require("../controllers/auth.controller");
const { protect } = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/refresh", protect, refreshUser);

router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("phoneNumber").notEmpty().withMessage("Phone Number is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

router.post("/signout", protect, logoutUser);

module.exports = router;
