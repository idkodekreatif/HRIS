const Employee = require("../../../models/Employee");
const Attendance = require("../../../models/Attendance");

exports.index = async (req, res) => {
  try {
    const attendances = await Attendance.find().populate("employee");
    res.render("dashboard/attendance/index", {
      attendances,
      title: "Attendance",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render("dashboard/attendance/create", {
      employees,
      title: "Create Attendance",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
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

exports.edit = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    const employees = await Employee.find();

    if (!attendance) {
      return res.status(404).send("Attendance not found");
    }
    res.render("dashboard/attendance/edit", {
      attendance,
      employees,
      title: "Edit Attendance",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const { employee, date, status, description } = req.body;

    let attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).send("Attendance not found");
    }

    attendance.employee = employee;
    attendance.date = date;
    attendance.status = status;
    attendance.description = description;

    await attendance.save();
    res.redirect("/attendance");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.redirect("/attendance");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
