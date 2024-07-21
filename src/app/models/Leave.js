// models/Leave.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaveSchema = new Schema(
  {
    employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    type: {
      type: String,
      enum: ["sick leave", "annual leave", "maternity leave", "big holiday"],
      required: true,
    },
    longLeave: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Leave", LeaveSchema);
