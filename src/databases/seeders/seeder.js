const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../../configs/config");
const User = require("../../app/models/User");
const Role = require("../../app/models/Role"); // Pastikan Role diimpor di sini
const Employee = require("../../app/models/Employee");
const connectToDatabase = require("../../configs/connectToDatabase");

async function seed() {
  await connectToDatabase();

  const role = new Role({ name: "admin", permission: "all" });
  await role.save();

  const employee = new Employee({
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
  });
  await employee.save();

  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = new User({
    username: "admin",
    password: hashedPassword,
    role: role._id,
    employee: employee._id,
  });
  await user.save();

  console.log("Database seeded!");
  mongoose.disconnect();
}

seed().catch((err) => console.log(err));
