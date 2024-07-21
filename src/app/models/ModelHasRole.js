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
  modelRoleId: {
    type: Number,
    unique: true, // Pastikan field ini unik
  },
});

ModelHasRoleSchema.plugin(AutoIncrement, {
  inc_field: "modelRoleId",
  start_seq: 1,
  unique: true, // Pastikan field ini unik
});

module.exports = mongoose.model("ModelHasRole", ModelHasRoleSchema);
