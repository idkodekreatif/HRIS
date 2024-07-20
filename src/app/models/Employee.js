const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    birth: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    position: { type: String, required: true },
    hiredate: { type: Date, required: true },
    salary: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
