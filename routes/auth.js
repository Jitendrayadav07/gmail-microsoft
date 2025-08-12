const router = require("express").Router();
const passport = require("passport");
const db = require("../config/db.config");
const { JWT_SECRET } = require("../config/jwtTokenKey");
const Response = require("../classes/Response");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const CLIENT_URL = `${process.env.REDIRECT_URL}/auth/google/success`;

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});


// step 2 if its scucessful google will reidrect to this url which belongs to frountend and in my froutend there is code whic writen in useeffect which call login/success and in that we have 
// backend logic that this email is present in our data base or not  

// Route for Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  async (req, res) => {
    try {
      const user_data = req.user;
      if (user_data) {
        const token = jwt.sign(
          {
            email_id: user_data.emails[0].value,
          },
          JWT_SECRET,
          { expiresIn: "24h" }
        );
        res.cookie("googleAuthToken", token, {
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production", 
          sameSite: "strict",
        });
        res.redirect(CLIENT_URL); 
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error during Google callback:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get(
  "/microsoft",
  passport.authenticate("microsoft", { scope: ["profile"] })
);

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;


personal="113113994498976877807" 

company="110241874420322401494"