const User = require("../../models/User");
const Role = require("../../models/Role"); // Pastikan Role diimpor di sini
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../../configs/config");

exports.login = async (req, res) => {
  if (req.method === "GET") {
    return res.render("auth/signin", {
      title: "Login",
      layout: "./layouts/auth",
    });
  }

  const { username, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ username }).populate("role");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role.name,
      },
    };

    const token = jwt.sign(payload, config.secretOrKey, {
      expiresIn: rememberMe ? "7d" : "1h",
    });

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
