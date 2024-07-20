const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayrollSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    payPeriod: {
      type: Date,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    allowance: {
      type: Number,
      required: true,
    },
    deductions: {
      type: Number,
      required: true,
    },
    netsalary: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payroll", PayrollSchema);
