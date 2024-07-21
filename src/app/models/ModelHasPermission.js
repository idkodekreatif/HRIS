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
  modelId: {
    // Ensure this is consistent
    type: Number, // This field should match with AutoIncrement configuration
  },
});

ModelHasPermissionSchema.plugin(AutoIncrement, { inc_field: "modelId" }); // Ensure this matches the schema field

module.exports = mongoose.model("ModelHasPermission", ModelHasPermissionSchema);
