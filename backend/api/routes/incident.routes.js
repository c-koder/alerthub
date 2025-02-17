const express = require("express");
const {
  createIncident,
  getIncidents,
} = require("../controllers/incident.controller");

const { protect } = require("../../middleware/authMiddleware");
const { body, param } = require("express-validator");

const router = express.Router();

// Route to create a new incident
router.post(
  "/create",
  protect,
  [
    body("title").notEmpty().withMessage("Incident title is required"),
    body("category").notEmpty().withMessage("Incident category is required"),
    body("description")
      .notEmpty()
      .withMessage("Incident description is required"),
    body("code").notEmpty().withMessage("Community code is required"),
  ],
  createIncident
);

// Route to get a incidents by community code
router.get(
  "/:code",
  [param("code").notEmpty().withMessage("Code is required")],
  getIncidents
);

module.exports = router;
