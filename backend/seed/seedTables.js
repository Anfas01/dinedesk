require("dotenv").config();
const mongoose = require("mongoose");
const Table = require("../models/Table");

const connectDB = require("../config/db");

const tables = [
  { tableNumber: 1, capacity: 2 },
  { tableNumber: 2, capacity: 2 },
  { tableNumber: 3, capacity: 4 },
  { tableNumber: 4, capacity: 4 },
  { tableNumber: 5, capacity: 6 },
];

const seedTables = async () => {
  try {
    await connectDB();

    await Table.deleteMany();

    await Table.insertMany(tables);

    console.log("✅ Tables seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedTables();