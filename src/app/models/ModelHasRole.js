const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
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
    type: Number,
  },
});

ModelHasRoleSchema.plugin(AutoIncrement, { inc_field: "modelId" });

module.exports = mongoose.model("ModelHasRole", ModelHasRoleSchema);
