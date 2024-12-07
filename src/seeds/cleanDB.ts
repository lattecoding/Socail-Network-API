import mongoose from "mongoose";

const cleanDB = async (): Promise<void> => {
  try {
    await mongoose.connection.dropDatabase(); // Drops the current database
    console.log("Database cleaned.");
  } catch (error) {
    console.error("Error cleaning database:", error);
    throw new Error("Error cleaning database");
  }
};

export default cleanDB;
