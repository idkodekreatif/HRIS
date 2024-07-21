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
      modelType: "App\\Models\\User", // Adjust this path as needed
    });

    // Save the new ModelHasPermission instance
    await modelHasPermission.save();
    next();
  } catch (err) {
    console.error("Error saving ModelHasPermission:", err);
    next(err);
  }
});

PermissionSchema.pre("remove", async function (next) {
  try {
    await mongoose
      .model("ModelHasPermission")
      .deleteMany({ permissionId: this._id });
    next();
  } catch (error) {
    console.error("Error removing ModelHasPermission:", error);
    next(error);
  }
});

module.exports = mongoose.model("Permission", PermissionSchema);
