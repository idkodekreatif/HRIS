const ModelHasPermission = require("../../../models/ModelHasPermission");
const Permission = require("../../../models/Permission");
const User = require("../../../models/User");

exports.index = async (req, res) => {
  try {
    const modelHasPermissions = await ModelHasPermission.find()
      .populate("permissionId")
      .populate("modelId");

    res.render("dashboard/roleAndPermission/modelHasPermission/index", {
      modelHasPermissions,
      title: "Has Permission",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    const permissions = await Permission.find();
    const users = await User.find();

    res.render("dashboard/roleAndPermission/modelHasPermission/create", {
      permissions,
      users,
      title: "Create Has Permission",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.store = async (req, res) => {
  try {
    const { permissionId, modelType, modelId } = req.body;

    const modelHasPermission = new ModelHasPermission({
      permissionId,
      modelType,
      modelId,
    });

    await modelHasPermission.save();
    res.redirect("/modelHasPermissions");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.edit = async (req, res) => {
  try {
    const permissions = await Permission.find();
    const users = await User.find();
    const modelHasPermission = await ModelHasPermission.findById(req.params.id);

    if (!modelHasPermission) {
      return res.status(404).send("Has permission not found");
    }

    res.render("dashboard/roleAndPermission/modelHasPermission/edit", {
      modelHasPermission,
      permissions,
      users,
      title: "Has Permission Leave",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const { permissionId, modelType, modelId } = req.body;

    let modelHasPermission = await ModelHasPermission.findById(req.params.id);
    if (!modelHasPermission) {
      return res.status(404).send("Has Permission not found");
    }

    modelHasPermission.permissionId = permissionId;
    modelHasPermission.modelType = modelType;
    modelHasPermission.modelId = modelId;
    await modelHasPermission.save();

    res.redirect("/modelHasPermissions");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  try {
    await ModelHasPermission.findByIdAndDelete(req.params.id);
    res.redirect("/modelHasPermissions");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
