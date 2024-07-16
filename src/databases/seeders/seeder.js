const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../../configs/config");
const User = require("../../app/models/User");
const Role = require("../../app/models/Role");
const Employee = require("../../app/models/Employee");
const connectToDatabase = require("../../configs/connectToDatabase");

async function seed() {
  await connectToDatabase();

  const roleAdmin = new Role({ name: "admin", permission: "all" });
  const roleUser = new Role({ name: "user", permission: "read" });
  await roleAdmin.save();
  await roleUser.save();

  const employees = [
    {
      name: "John Doe",
      address: "123 Street",
      birth: new Date("1990-01-01"),
      gender: "male",
      email: "john@example.com",
      phone: "1234567890",
      department: "IT",
      position: "Manager",
      hiredate: new Date("2020-01-01"),
      salary: 100000,
    },
    {
      name: "Jane Smith",
      address: "456 Avenue",
      birth: new Date("1985-02-15"),
      gender: "female",
      email: "jane@example.com",
      phone: "9876543210",
      department: "HR",
      position: "Director",
      hiredate: new Date("2018-03-15"),
      salary: 120000,
    },
  ];

  const savedEmployees = await Employee.insertMany(employees);

  const users = [
    {
      username: "admin",
      password: await bcrypt.hash("password123", 10),
      role: roleAdmin._id,
      employee: savedEmployees[0]._id,
    },
    {
      username: "user",
      password: await bcrypt.hash("password456", 10),
      role: roleUser._id,
      employee: savedEmployees[1]._id,
    },
  ];

  await User.insertMany(users);

  console.log("Database seeded!");
  mongoose.disconnect();
}

seed().catch((err) => console.log(err));
