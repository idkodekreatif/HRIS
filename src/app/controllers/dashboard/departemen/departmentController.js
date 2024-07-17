const Department = require("../../../models/Department");
const Employee = require("../../../models/Employee");

exports.index = async (req, res) => {
  try {
    const departments = await Department.find().populate("manager");
    res.render("dashboard/departement/index", {
      departments,
      title: "Departement",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.renderAddDepartmentForm = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render("dashboard/departement/create", {
      employees,
      title: "Create Departement",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.addDepartment = async (req, res) => {
  try {
    const { name, manager } = req.body;
    const newDepartment = new Department({
      name,
      manager,
    });
    await newDepartment.save();
    res.redirect("/departments");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
