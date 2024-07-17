const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: { type: String, required: true },
  manager: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Department", DepartmentSchema);
