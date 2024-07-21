const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth/authController");
const dashboardController = require("../controllers/dashboard/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");
const employeeController = require("../controllers/dashboard/employee/employeeController");
const departmentController = require("../controllers/dashboard/departemen/departmentController");
const attendanceController = require("../controllers/dashboard/attendance/attendanceController");
const payrollController = require("../controllers/dashboard/payroll/payrollController");
const leaveController = require("../controllers/dashboard/leave/leaveController");
const roleController = require("../controllers/dashboard/rolesAndPermissions/roleController");
const permissionController = require("../controllers/dashboard/rolesAndPermissions/permissionController");
const modelHasRoleController = require("../controllers/dashboard/rolesAndPermissions/modelHasRoleController");
const modelHasPermissionController = require("../controllers/dashboard/rolesAndPermissions/modelHasPermissionController");
const roleHasPermissionController = require("../controllers/dashboard/rolesAndPermissions/roleHasPermissionController");

router.get("/", auth.index);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

router.get("/dashboard", authMiddleware, dashboardController.index);

// Employee routes
router
  .route("/employee")
  .get(authMiddleware, employeeController.index)
  .post(authMiddleware, employeeController.store);
router
  .route("/employee/add")
  .get(authMiddleware, employeeController.create)
  .post(authMiddleware, employeeController.store);
router.route("/employee/show/:id").get(authMiddleware, employeeController.show);
router
  .route("/employee/edit/:id")
  .get(authMiddleware, employeeController.edit)
  .post(authMiddleware, employeeController.update);
router
  .route("/employee/delete/:id")
  .get(authMiddleware, employeeController.delete);

// Department routes
router
  .route("/departments")
  .get(authMiddleware, departmentController.index)
  .post(authMiddleware, departmentController.store);
router
  .route("/departments/add")
  .get(authMiddleware, departmentController.create)
  .post(authMiddleware, departmentController.store);
router
  .route("/departments/edit/:id")
  .get(authMiddleware, departmentController.edit)
  .post(authMiddleware, departmentController.update);
router
  .route("/departments/delete/:id")
  .get(authMiddleware, departmentController.delete);

// Attendance routes
router
  .route("/attendance")
  .get(authMiddleware, attendanceController.index)
  .post(authMiddleware, attendanceController.store);
router
  .route("/attendance/add")
  .get(authMiddleware, attendanceController.create)
  .post(authMiddleware, attendanceController.store);
router
  .route("/attendance/edit/:id")
  .get(authMiddleware, attendanceController.edit)
  .post(authMiddleware, attendanceController.update);
router
  .route("/attendance/delete/:id")
  .get(authMiddleware, attendanceController.delete);

// Payroll routes
router
  .route("/payroll")
  .get(authMiddleware, payrollController.index)
  .post(authMiddleware, payrollController.store);
router
  .route("/payroll/add")
  .get(authMiddleware, payrollController.create)
  .post(authMiddleware, payrollController.store);
router.route("/payroll/show/:id").get(authMiddleware, payrollController.show);
router
  .route("/payroll/edit/:id")
  .get(authMiddleware, payrollController.edit)
  .post(authMiddleware, payrollController.update);
router
  .route("/payroll/delete/:id")
  .get(authMiddleware, payrollController.delete);

// Leave routes
router
  .route("/leave")
  .get(authMiddleware, leaveController.index)
  .post(authMiddleware, leaveController.store);
router
  .route("/leave/add")
  .get(authMiddleware, leaveController.create)
  .post(authMiddleware, leaveController.store);
router.route("/leave/show/:id").get(authMiddleware, leaveController.show);
router
  .route("/leave/edit/:id")
  .get(authMiddleware, leaveController.edit)
  .post(authMiddleware, leaveController.update);
router.route("/leave/delete/:id").get(authMiddleware, leaveController.delete);

// Rple routes
router
  .route("/role")
  .get(authMiddleware, roleController.index)
  .post(authMiddleware, roleController.store);
router
  .route("/role/add")
  .get(authMiddleware, roleController.create)
  .post(authMiddleware, roleController.store);
router
  .route("/role/edit/:id")
  .get(authMiddleware, roleController.edit)
  .post(authMiddleware, roleController.update);
router.route("/role/delete/:id").get(authMiddleware, roleController.delete);

// Permission routes
router
  .route("/permission")
  .get(authMiddleware, permissionController.index)
  .post(authMiddleware, permissionController.store);
router
  .route("/permission/add")
  .get(authMiddleware, permissionController.create)
  .post(authMiddleware, permissionController.store);
router
  .route("/permission/edit/:id")
  .get(authMiddleware, permissionController.edit)
  .post(authMiddleware, permissionController.update);
router
  .route("/permission/delete/:id")
  .get(authMiddleware, permissionController.delete);

// model Has Role routes
router
  .route("/model-has-role")
  .get(authMiddleware, modelHasRoleController.index)
  .post(authMiddleware, modelHasRoleController.store);
router
  .route("/model-has-role/add")
  .get(authMiddleware, modelHasRoleController.create)
  .post(authMiddleware, modelHasRoleController.store);
router
  .route("/model-has-role/edit/:id")
  .get(authMiddleware, modelHasRoleController.edit)
  .post(authMiddleware, modelHasRoleController.update);
router
  .route("/model-has-role/delete/:id")
  .get(authMiddleware, modelHasRoleController.delete);

// model Has Permission routes
router
  .route("/model-has-permission")
  .get(authMiddleware, modelHasPermissionController.index)
  .post(authMiddleware, modelHasPermissionController.store);
router
  .route("/model-has-permission/add")
  .get(authMiddleware, modelHasPermissionController.create)
  .post(authMiddleware, modelHasPermissionController.store);
router
  .route("/model-has-permission/edit/:id")
  .get(authMiddleware, modelHasPermissionController.edit)
  .post(authMiddleware, modelHasPermissionController.update);
router
  .route("/model-has-permission/delete/:id")
  .get(authMiddleware, modelHasPermissionController.delete);

// role Has Permission routes
router
  .route("/role-has-permission")
  .get(authMiddleware, roleHasPermissionController.index)
  .post(authMiddleware, roleHasPermissionController.store);
router
  .route("/role-has-permission/add")
  .get(authMiddleware, roleHasPermissionController.create)
  .post(authMiddleware, roleHasPermissionController.store);
router
  .route("/role-has-permission/edit/:id")
  .get(authMiddleware, roleHasPermissionController.edit)
  .post(authMiddleware, roleHasPermissionController.update);
router
  .route("/role-has-permission/delete/:id")
  .get(authMiddleware, roleHasPermissionController.delete);

module.exports = router;
