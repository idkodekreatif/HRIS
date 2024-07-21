const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelHasPermissionSchema = new Schema({
  permissionId: {
    type: Schema.Types.ObjectId,
    ref: "Permission",
    required: true,
  },
  modelType: {
    type: String,
    required: true,
  },
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "modelType",
  },
});

module.exports = mongoose.model("ModelHasPermission", ModelHasPermissionSchema);
