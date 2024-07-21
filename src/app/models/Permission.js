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

PermissionSchema.post("save", async function (doc, next) {
  const ModelHasPermission = mongoose.model("ModelHasPermission");

  try {
    const modelHasPermission = new ModelHasPermission({
      permissionId: doc._id,
      modelType: "App\\Models\\User", // Sesuaikan path model yang benar
    });
    await modelHasPermission.save();
    next();
  } catch (err) {
    next(err);
  }
});

// Hook untuk menghapus entri ModelHasPermission ketika Permission dihapus
PermissionSchema.pre("remove", async function (next) {
  try {
    await mongoose
      .model("ModelHasPermission")
      .deleteMany({ permissionId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Permission", PermissionSchema);
