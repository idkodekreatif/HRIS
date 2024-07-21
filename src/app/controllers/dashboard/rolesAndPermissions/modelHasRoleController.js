const ModelHasRole = require("../../../models/ModelHasRole");
const Role = require("../../../models/Role");
const User = require("../../../models/User"); // Assuming you have a User model

exports.index = async (req, res) => {
  try {
    const modelHasRoles = await ModelHasRole.find()
      .populate("roleId")
      .populate("modelId");

    res.render("dashboard/roleAndPermission/modelHasRole/index", {
      modelHasRoles,
      title: "Has Role",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    const roles = await Role.find();
    const users = await User.find();

    res.render("dashboard/roleAndPermission/modelHasRole/create", {
      roles,
      users,
      title: "Create Has Role",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.store = async (req, res) => {
  try {
    const { roleId, modelType, modelId } = req.body;

    const modelHasRole = new ModelHasRole({
      roleId,
      modelType,
      modelId,
    });

    await modelHasRole.save();
    res.redirect("/modelHasRoles");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.edit = async (req, res) => {
  try {
    const roles = await Role.find();
    const users = await User.find();
    const modelHasRole = await ModelHasRole.findById(req.params.id);

    if (!modelHasRole) {
      return res.status(404).send("Has role not found");
    }

    res.render("dashboard/roleAndPermission/modelHasRole/edit", {
      modelHasRole,
      roles,
      users,
      title: "Update Has Role",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const { roleId, modelType, modelId } = req.body;

    let modelHasRole = await ModelHasRole.findById(req.params.id);
    if (!modelHasRole) {
      return res.status(404).send("Has role not found");
    }

    modelHasRole.employee = roleId;
    modelHasRole.startDate = modelType;
    modelHasRole.endDate = modelId;
    await modelHasRole.save();

    res.redirect("/modelHasRoles");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    await ModelHasRole.findByIdAndDelete(req.params.id);
    res.redirect("/modelHasRoles");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
