require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async (DATABASE_URI) => {
  console.log("DB connection trying..");
  mongoose.set("strictQuery", false);
  mongoose.connect(DATABASE_URI, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("DB connection established");
  });
};

module.exports = connectDB;
