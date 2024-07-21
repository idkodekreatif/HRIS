const Permission = require("../../../models/Permission");

exports.index = async (req, res) => {
  try {
    const permissions = await Permission.find();

    res.render("dashboard/roleAndPermission/permission/index", {
      permissions,
      title: "permissions",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    res.render("dashboard/roleAndPermission/permission/create", {
      title: "create permissions",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.store = async (req, res) => {
  try {
    const { name, guardName } = req.body;
    const permission = new Permission({ name, guardName });
    await permission.save();

    res.redirect("/permissions");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.edit = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).send("Permissions not found");
    }

    res.render("dashboard/roleAndPermission/permission/edit", {
      permission,
      title: "Update Permissions",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const { name, guardName } = req.body;

    let permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).send("Permission not found");
    }

    permission.name = name;
    permission.guardName = guardName;

    await permission.save();

    res.redirect("/permissions");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    await Permission.findByIdAndDelete(req.params.id);
    res.redirect("/permissions");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
