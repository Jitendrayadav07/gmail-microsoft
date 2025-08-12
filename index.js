const formData = require("express-form-data");
const express = require("express");
const os = require("os");
var bodyParser = require('body-parser');
var cors = require('cors');
const session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser');
const passport = require("passport");
const routes = require("./routes");
const passportSetup = require('./passport')
const authroute = require('./routes/auth')
const path = require('path')
const app = express();

app.use(
    session({
      secret: "your-secret",
      resave: true,
      saveUninitialized: true,
    })
);
  
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // Update to match the frontend origin
    credentials: true, // Allow cookies to be sent
};
  
app.use(cors(corsOptions));

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

  

// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
// app.use(formData.stream());
//  union the body and the files
app.use(formData.union());

// Sync models with the database
const sequelizeDB = require("./config/db.config");
sequelizeDB.sequelize.sync(sequelizeDB);


app.use(passport.initialize());
app.use(passport.session());



// Use routes
app.use("/v1", routes);
// set port, listen for requests
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});