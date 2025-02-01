const User = require("../models/user.model");
const generateToken = require("../../utils/generateToken");
const { validationResult } = require("express-validator");
const { logMessage } = require("../../utils/logger");

// @desc    Refresh user data
// @route   GET /api/auth/refresh
// @access  Public
const refreshUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((err) => err.msg)
      .join(", ");

    logMessage(
      "error",
      "Validation Middleware",
      errorMessage,
      "/api/auth/register"
    );

    return res.status(400).json({ data: errorMessage });
  }

  const { username, phoneNumber, city, state, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      let errorMessage = "User already exists";

      if (existingUser.username === username) {
        errorMessage = "Username is already taken";
      } else if (existingUser.email === email) {
        errorMessage = "Email is already registered";
      }

      logMessage("error", "registerUser", errorMessage, "/api/auth/register");

      return res.status(400).json({ data: errorMessage });
    }

    const user = await User.create({
      username,
      phoneNumber,
      city,
      state,
      email,
      password,
    });

    if (user) {
      logMessage(
        "info",
        "registerUser",
        "User registered successfully",
        "/api/auth/register"
      );
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      logMessage(
        "error",
        "registerUser",
        "Invalid user data",
        "/api/auth/register"
      );
      res.status(400).json({ data: "Invalid user data" });
    }
  } catch (error) {
    logMessage("error", "registerUser", error.message, "/api/auth/register");
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors
      .array()
      .map((err) => err.msg)
      .join(", ");

    logMessage(
      "error",
      "Validation Middleware",
      errorMessage,
      "/api/auth/register"
    );

    return res.status(400).json({ data: errorMessage });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logMessage("error", "loginUser", "User not found", "/api/auth/login");
      return res.status(400).json({ data: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      logMessage(
        "error",
        "loginUser",
        "Invalid credentials",
        "/api/auth/login"
      );
      return res.status(400).json({ data: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true, // Prevent client-side access
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      sameSite: "strict", // Prevent CSRF attacks
    });

    logMessage(
      "info",
      "loginUser",
      "User logged in successfully",
      "/api/auth/login"
    );

    // Return user data (without the token)
    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        city: user.city,
        state: user.state,
      },
    });
  } catch (error) {
    logMessage("error", "loginUser", error.message, "/api/auth/login");
    next(error);
  }
};

// @desc    Logout user (optional, since JWT is stateless)
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    logMessage(
      "info",
      "signoutUser",
      "User logged out successfully",
      "/api/auth/logout"
    );

    res.status(200).json({ data: "Logged out successfully" });
  } catch (error) {
    logMessage("error", "signoutUser", error.message, "/api/auth/logout");
    next(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser, refreshUser };
