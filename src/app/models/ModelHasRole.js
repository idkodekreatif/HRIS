const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelHasRoleSchema = new Schema({
  roleId: {
    type: Schema.Types.ObjectId,
    ref: "Role",
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

module.exports = mongoose.model("ModelHasRole", ModelHasRoleSchema);
