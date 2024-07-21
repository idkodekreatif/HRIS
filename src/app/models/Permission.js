const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    guardName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", PermissionSchema);
