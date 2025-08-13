const express = require("express");
const router = express.Router();

const googleSuccess = require("./google_auth")

router.use("/auth",googleSuccess);

module.exports = router;