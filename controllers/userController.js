const Response = require("../classes/Response");
const db = require("../config/db.config");


const gmailSignIn = async (req, res) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .send(
            Response.sendResponse(false, null, "Not Found", 401)
          );
      }
      const emailId = req.user.emails[0].value;
      const name = req.user.displayName || ""; 
  
      let user = await db.users.findOne({where: { email: emailId }});
  
      if (!user) {
        user = await db.users.create({
          email: emailId,
          contact_number: name,
        });
      }

      const token = jwt.sign(
        { email: user.email, contact_number: name },
        JWT_SECRET,
        { expiresIn: "24h" }
      );

      const userResponse = user.toJSON();
      userResponse.token = token;
  
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: userResponse,
      });
    } catch (err) {
      return res.status(500).send(Response.sendResponse(false, null, err, 500));
    }
};
  
const microsoftSignIn = async (req, res) => {
  try {
    if (!req.user || !req.user.emails || !req.user.emails[0]?.value) {
      return res
        .status(401)
        .send(Response.sendResponse(false, null, "Invalid Microsoft account data", 401));
    }

    const emailId = req.user.emails[0].value;
    const name = req.user.displayName || "";

    let user = await db.users.findOne({where: { email: emailId },});

    if (!user) {
      user = await db.users.create({email: emailId,contact_number: name});
    }

    const token = jwt.sign(
      { email: user.email, contact_number: name },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const userResponse = user.toJSON();
    userResponse.token = token;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
    });

  } catch (err) {
    console.error("Microsoft login error:", err);
    return res
      .status(500)
      .send(Response.sendResponse(false, null, "Internal Server Error", 500));
  }
};


module.exports = {
  gmailSignIn,
  microsoftSignIn,
};