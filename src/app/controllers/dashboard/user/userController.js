const User = require("../../../models/User");
const Employee = require("../../../models/Employee");
const Role = require("../../../models/Role");
const bcrypt = require("bcryptjs");

exports.index = async (req, res) => {
  try {
    const users = await User.find().populate("role employee");
    res.render("dashboard/users/index", { users, title: "All Users" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    const roles = await Role.find();
    const employees = await Employee.find();
    res.render("dashboard/users/create", {
      roles,
      employees,
      title: "Create Users",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.store = async (req, res) => {
  try {
    const { username, password, role, employee } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      employee,
    });
    await newUser.save();
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.edit = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const roles = await Role.find();
    const employees = await Employee.find();
    res.render("dashboard/users/edit", {
      user,
      roles,
      employees,
      title: "Edit Users",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const { username, role, employee } = req.body;
    const user = await User.findById(req.params.id);

    user.username = username;
    user.role = role;
    user.employee = employee;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.save();
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
