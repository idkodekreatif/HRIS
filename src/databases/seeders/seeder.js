const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../../configs/config");
const User = require("../../app/models/User");
const Role = require("../../app/models/Role");
const Employee = require("../../app/models/Employee");
const Department = require("../../app/models/Department");
const connectToDatabase = require("../../configs/connectToDatabase");

async function seed() {
  await connectToDatabase();

  try {
    // Step 1: Insert Roles
    const roleAdmin = new Role({ name: "admin", permission: "all" });
    const roleUser = new Role({ name: "user", permission: "read" });
    await roleAdmin.save();
    await roleUser.save();
    console.log("Roles inserted successfully");

    // Step 2: Insert Users
    const users = [
      {
        username: "admin",
        password: await bcrypt.hash("password123", 10),
        role: roleAdmin._id,
      },
      {
        username: "user",
        password: await bcrypt.hash("password456", 10),
        role: roleUser._id,
      },
    ];

    const savedUsers = await User.insertMany(users);
    console.log("Users inserted successfully");

    // Step 3: Insert Employees
    const employees = [
      {
        name: "John Doe",
        address: "123 Street",
        birth: new Date("1990-01-01"),
        gender: "male",
        email: "john@example.com",
        phone: "1234567890",
        department: null, // Placeholder for department ObjectId
        position: "Manager",
        hiredate: new Date("2020-01-01"),
        salary: 100000,
        user: savedUsers.find((user) => user.username === "admin")._id,
      },
      {
        name: "Jane Smith",
        address: "456 Avenue",
        birth: new Date("1985-02-15"),
        gender: "female",
        email: "jane@example.com",
        phone: "9876543210",
        department: null, // Placeholder for department ObjectId
        position: "Director",
        hiredate: new Date("2018-03-15"),
        salary: 120000,
        user: savedUsers.find((user) => user.username === "user")._id,
      },
    ];

    const savedEmployees = await Employee.insertMany(employees);
    console.log("Employees inserted successfully");

    // Step 4: Insert Departments
    const departments = [
      {
        name: "IT",
        manager: savedEmployees.find((emp) => emp.name === "John Doe")._id,
      },
      {
        name: "HR",
        manager: savedEmployees.find((emp) => emp.name === "Jane Smith")._id,
      },
    ];

    await Department.insertMany(departments);
    console.log("Departments inserted successfully");

    console.log("Database seeding completed!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

seed().catch((err) => console.log(err));
