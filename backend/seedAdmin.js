const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");
const connectDB = require("./config/db");

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const existing = await Admin.findOne({ username: "admin" });
    if (existing) {
      console.log("⚠️ Admin already exists. Skipping creation.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
    });

    await admin.save();
    console.log("Admin user created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err.message);
    process.exit(1);
  }
};

seedAdmin();
