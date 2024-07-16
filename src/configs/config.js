require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
};
