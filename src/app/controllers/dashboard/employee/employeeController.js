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

exports.create = async (req, res) => {
  try {
    const departments = await Department.find().populate("manager");
    res.render("dashboard/employee/create", {
      departments,
      title: "Create Employee",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.store = async (req, res) => {
  try {
    const {
      name,
      address,
      birth,
      gender,
      email,
      phone,
      department,
      position,
      hiredate,
      salary,
    } = req.body;
    const newEmployee = new Employee({
      name,
      address,
      birth,
      gender,
      email,
      phone,
      department,
      position,
      hiredate,
      salary,
    });
    await newEmployee.save();
    res.redirect("/employee");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
