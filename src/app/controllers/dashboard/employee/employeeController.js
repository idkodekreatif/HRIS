const Employee = require("../../../models/Employee");
const Department = require("../../../models/Department");

exports.index = async (req, res) => {
  try {
    const employees = await Employee.find().populate("department");
    res.render("dashboard/employee/index", { employees, title: "Employee" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
