const Employee = require("../../../models/Employee");
const Attendance = require("../../../models/Attendance");

exports.index = async (req, res) => {
  const attendances = await Attendance.find().populate("employee");
  res.render("dashboard/attendance/index", {
    attendances,
    title: "Attendance",
  });
};

exports.create = async (req, res) => {
  const employees = await Employee.find();
  res.render("dashboard/attendance/create", {
    employees,
    title: "Create Attendance",
  });
};

exports.store = async (req, res) => {
  try {
    const { employee, date, status, description } = req.body;
    const attendance = new Attendance({ employee, date, status, description });
    await attendance.save();
    res.redirect("/attendance");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
