const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connection to MongoDB successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectToDatabase;
