const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
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
  modelPermissionId: {
    type: Number,
    unique: true, // Pastikan field ini unik
  },
});

ModelHasPermissionSchema.plugin(AutoIncrement, {
  inc_field: "modelPermissionId",
  start_seq: 1,
  unique: true, // Tambahkan opsi ini untuk memastikan keunikannya
});

module.exports = mongoose.model("ModelHasPermission", ModelHasPermissionSchema);
