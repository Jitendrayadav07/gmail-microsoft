// index.js
const express = require("express");
const router = express.Router();

// Import route handlers
const userRoutes = require("./userRoute");
const googleSuccess = require("./google_auth")

// Register route handlers
router.use("/user", userRoutes);
router.use("/auth",googleSuccess);

module.exports = router;