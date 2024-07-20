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

exports.show = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "department"
    );
    const departments = await Department.find().populate("manager");
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.render("dashboard/employee/show", {
      employee,
      departments,
      title: "Show Employee",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.edit = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "department"
    );
    const departments = await Department.find().populate("manager");
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.render("dashboard/employee/edit", {
      employee,
      departments,
      title: "Edit Employee",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
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
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    employee.name = name;
    employee.address = address;
    employee.birth = birth;
    employee.gender = gender;
    employee.email = email;
    employee.phone = phone;
    employee.department = department;
    employee.position = position;
    employee.hiredate = hiredate;
    employee.salary = salary;
    await employee.save();
    res.redirect("/employee");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect("/employee");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
