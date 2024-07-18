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

exports.create = async (req, res) => {
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

exports.store = async (req, res) => {
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

exports.edit = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate(
      "manager"
    );
    const employees = await Employee.find();
    if (!department) {
      return res.status(404).send("Department not found");
    }
    res.render("dashboard/departement/edit", {
      department,
      employees,
      title: "Edit Departemen",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const { name, manager } = req.body;
    let department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).send("Department not found");
    }
    department.name = name;
    department.manager = manager;
    await department.save();
    res.redirect("/departments");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await Department.findByIdAndDelete(id);
    res.redirect("/departments");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// exports.delete = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Department.findByIdAndDelete(id);
//     res.redirect("/departments");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };
