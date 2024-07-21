const Role = require("../../../models/Role");

exports.index = async (req, res) => {
  try {
    const roles = await Role.find();
    res.render("dashboard/roleAndPermission/role/index", {
      roles,
      title: "Setting Role",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    res.render("dashboard/roleAndPermission/role/create", {
      title: "Setting Role",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.store = async (req, res) => {
  try {
    const { name, guardName } = req.body;
    const role = new Role({ name, guardName });

    await role.save();
    res.redirect("/role");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.edit = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).send("Role not found");
    }

    res.render("dashboard/roleAndPermission/role/edit", {
      role,
      title: "Edit Role",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const { name, guardName } = req.body;

    let role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).send("Role not found");
    }

    role.name = name;
    role.guardName = guardName;
    await role.save();

    res.redirect("/role");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.redirect("/role");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
