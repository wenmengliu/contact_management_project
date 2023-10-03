const mongoose = require("mongoose");

// Define MongoDB server and port as variables
const MONGO_SERVER = "0.0.0.0";
const MONGO_PORT = "27017";
const DB_NAME = "contacts";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${MONGO_SERVER}:${MONGO_PORT}/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
