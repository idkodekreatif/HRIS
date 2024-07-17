const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth/authController");
const dashboardController = require("../controllers/dashboard/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");
const employeeController = require("../controllers/dashboard/employee/employeeController");
const departmentController = require("../controllers/dashboard/departemen/departmentController");

router.get("/", auth.index);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

router.get("/dashboard", authMiddleware, dashboardController.index);
// employee
router.get("/employee", authMiddleware, employeeController.index);
// departemens
router.get("/departments", authMiddleware, departmentController.index);
router.get(
  "/departments/add",
  authMiddleware,
  departmentController.renderAddDepartmentForm
);
router.post(
  "/departments/add",
  authMiddleware,
  departmentController.addDepartment
);

module.exports = router;
