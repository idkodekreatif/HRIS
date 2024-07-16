const getGreeting = require("../../helpers/getGreeting");

const greetingMiddleware = (req, res, next) => {
  const user = req.session.user;
  res.locals.greeting = getGreeting();
  res.locals.currentTime = new Date().toLocaleTimeString();
  res.locals.username = user ? user.username : "Guest";
  next();
};

module.exports = greetingMiddleware;
