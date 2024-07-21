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

router.get("/", auth.index);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

router.get("/dashboard", authMiddleware, dashboardController.index);
// employee
router.get("/employee", authMiddleware, employeeController.index);
router.get("/employee/add", authMiddleware, employeeController.create);
router.post("/employee/add", authMiddleware, employeeController.store);
router.get("/employee/show/:id", authMiddleware, employeeController.show);
router.get("/employee/edit/:id", authMiddleware, employeeController.edit);
router.post("/employee/edit/:id", authMiddleware, employeeController.update);
router.get("/employee/delete/:id", authMiddleware, employeeController.delete);

// departemens
router.get("/departments", authMiddleware, departmentController.index);
router.get("/departments/add", authMiddleware, departmentController.create);
router.post("/departments/add", authMiddleware, departmentController.store);
router.get("/departments/edit/:id", authMiddleware, departmentController.edit);
router.post(
  "/departments/edit/:id",
  authMiddleware,
  departmentController.update
);
router.get(
  "/departments/delete/:id",
  authMiddleware,
  departmentController.delete
);

// Attendance
router.get("/attendance", authMiddleware, attendanceController.index);
router.get("/attendance/add", authMiddleware, attendanceController.create);
router.post("/attendance/add", authMiddleware, attendanceController.store);
router.get("/attendance/edit/:id", authMiddleware, attendanceController.edit);
router.post(
  "/attendance/edit/:id",
  authMiddleware,
  attendanceController.update
);
router.get(
  "/attendance/delete/:id",
  authMiddleware,
  attendanceController.delete
);

// Payroll
router.get("/payroll", authMiddleware, payrollController.index);
router.get("/payroll/add", authMiddleware, payrollController.create);
router.post("/payroll/add", authMiddleware, payrollController.store);
router.get("/payroll/show/:id", authMiddleware, payrollController.show);
router.get("/payroll/edit/:id", authMiddleware, payrollController.edit);
router.post("/payroll/edit/:id", authMiddleware, payrollController.update);
router.get("/payroll/delete/:id", authMiddleware, payrollController.delete);

// Leave
router.get("/leave", authMiddleware, leaveController.index);
router.get("/leave/add", authMiddleware, leaveController.add);
router.post("/leave/add", authMiddleware, leaveController.store);
router.get("/leave/show/:id", authMiddleware, leaveController.show);
router.get("/leave/edit/:id", authMiddleware, leaveController.edit);
router.post("/leave/edit/:id", authMiddleware, leaveController.update);
router.get("/leave/delete/:id", authMiddleware, leaveController.delete);

module.exports = router;
