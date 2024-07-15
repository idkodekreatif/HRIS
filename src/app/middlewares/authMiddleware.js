const jwt = require("jsonwebtoken");
const config = require("../../configs/config");

module.exports = function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, config.secretOrKey);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.clearCookie("token");
    res.redirect("/login");
  }
};
