const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth/authController");
const dashboardController = require("../controllers/dashboard/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");
const employeeController = require("../controllers/dashboard/employee/employeeController");
const departmentController = require("../controllers/dashboard/departemen/departmentController");
const attendanceController = require("../controllers/dashboard/attendance/attendanceController");

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
router.post("/employee/edit/:id", employeeController.update);
router.get("/employee/delete/:id", employeeController.delete);

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

module.exports = router;
