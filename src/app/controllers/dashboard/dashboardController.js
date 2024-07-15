const User = require("../../models/User");
const Employee = require("../../models/Employee");

exports.index = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("employee role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const employee = user.employee;

    res.render("dashboard/dashboard", {
      title: "Dashboard",
      user,
      employee,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
