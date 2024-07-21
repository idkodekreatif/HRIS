const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleHasPermissionSchema = new Schema({
  permissionId: {
    type: Schema.Types.ObjectId,
    ref: "Permission",
    required: true,
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

module.exports = mongoose.model("RoleHasPermission", RoleHasPermissionSchema);
