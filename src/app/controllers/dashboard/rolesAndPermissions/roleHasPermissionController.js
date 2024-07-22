const RoleHasPermission = require("../../../models/RoleHasPermission");
const Role = require("../../../models/Role");
const Permission = require("../../../models/Permission");

exports.index = async (req, res) => {
  try {
    const roleHasPermissions = await RoleHasPermission.find()
      .populate("roleId")
      .populate("permissionId");
    res.render("dashboard/roleAndPermission/roleHasPermissions/index", {
      roleHasPermissions,
      title: "Has Permission",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    const roles = await Role.find();
    const permissions = await Permission.find();

    res.render("dashboard/roleAndPermission/roleHasPermissions/create", {
      roles,
      permissions,
      title: "Create Role Has Permission",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.store = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;
    const roleHasPermission = new RoleHasPermission({ roleId, permissionId });

    await roleHasPermission.save();
    res.redirect("/rhp");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.edit = async (req, res) => {
  try {
    const roles = await Role.find();
    const permissions = await Permission.find();
    const roleHasPermission = await RoleHasPermission.findById(req.params.id);

    if (!roleHasPermission) {
      return res.status(404).send("Role has permission not found");
    }

    res.render("dashboard/roleAndPermission/roleHasPermissions/edit", {
      roleHasPermission,
      roles,
      permissions,
      title: "Update Role Has Permission",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    let roleHasPermission = await RoleHasPermission.findById(req.params.id);
    if (!roleHasPermission) {
      return res.status(404).send("Role has permission not found");
    }

    roleHasPermission.roleId = roleId;
    roleHasPermission.permissionId = permissionId;

    await roleHasPermission.save();
    res.redirect("/rhp");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    await RoleHasPermission.findByIdAndDelete(req.params.id);
    res.redirect("/rhp");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
