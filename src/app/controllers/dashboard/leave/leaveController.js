const Employee = require("../../../models/Employee");
const Leave = require("../../../models/Leave");

exports.index = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee")
      .sort({ createdAt: -1 });
    res.render("dashboard/leave/index", { leaves, title: "Leave" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.add = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render("dashboard/leave/create", { employees, title: "Create Leave" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.store = async (req, res) => {
  try {
    const {
      employee,
      startDate,
      endDate,
      type,
      longLeave,
      description,
      status,
    } = req.body;

    const leave = new Leave({
      employee,
      startDate,
      endDate,
      type,
      longLeave,
      description,
      status,
    });

    await leave.save();
    res.redirect("/leave");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.show = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    const employees = await Employee.find();
    if (!leave) {
      return res.status(404).send("Leave not found");
    }
    res.render("dashboard/leave/show", {
      leave,
      employees,
      title: "Show Leave",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.edit = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    const employees = await Employee.find();
    if (!leave) {
      return res.status(404).send("Leave not found");
    }
    res.render("dashboard/leave/edit", {
      leave,
      employees,
      title: "Update Leave",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const {
      employee,
      startDate,
      endDate,
      type,
      longLeave,
      description,
      status,
    } = req.body;

    let leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).send("Leave not found");
    }

    leave.employee = employee;
    leave.startDate = startDate;
    leave.endDate = endDate;
    leave.type = type;
    leave.longLeave = longLeave;
    leave.description = description;
    leave.status = status;
    await leave.save();

    res.redirect("/leave");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.redirect("/leave");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
