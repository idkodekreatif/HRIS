const User = require("../../models/User");
const Employee = require("../../models/Employee");

exports.index = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("employee role");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const employeeCount = await Employee.countDocuments();
    const departmentCount = await Employee.distinct("department");
    const attendanceCount = 95; // Placeholder value
    const leaveCount = 10; // Placeholder value
    const payrollCount = 1000000; // Placeholder value

    res.render("dashboard/dashboard", {
      title: "Dashboard",
      user,
      employee: user.employee,
      summary: {
        employeeCount,
        departmentCount: departmentCount.length,
        attendanceCount,
        leaveCount,
        payrollCount,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
