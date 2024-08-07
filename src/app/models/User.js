const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    employee: { type: Schema.Types.ObjectId, ref: "Employee" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
