const express = require("express");
const router = express.Router();
const auth = require("../app/controllers/auth/authController");
router.get("/", (req, res) => res.send("route"));
router.get("/login", auth.login);

module.exports = router;
