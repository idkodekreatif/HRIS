const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth/authController");
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/", (req, res) => res.send("route"));

router.get("/login", auth.login);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

router.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard", { user: req.user });
});

module.exports = router;
