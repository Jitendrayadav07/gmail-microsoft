const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
const CLIENT_URL = "http://localhost:5173/";


router.get('/gmail',
    userController.gmailSignIn)


router.get('/microsoft',
    userController.microsoftSignIn)


module.exports = router;