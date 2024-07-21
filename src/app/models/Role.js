const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
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

RoleSchema.post("save", async function (doc, next) {
  const ModelHasRole = mongoose.model("ModelHasRole");

  try {
    const modelHasRole = new ModelHasRole({
      roleId: doc._id,
      modelType: "App\\Models\\User", // Sesuaikan path model yang benar
    });
    await modelHasRole.save();
    next();
  } catch (err) {
    next(err);
  }
});

// Hook untuk menghapus entri ModelHasRole ketika Role dihapus
RoleSchema.pre("remove", async function (next) {
  try {
    await mongoose.model("ModelHasRole").deleteMany({ roleId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Role", RoleSchema);
