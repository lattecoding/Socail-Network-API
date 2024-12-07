import mongoose from "mongoose";

// Function to connect to the database
const db = async (): Promise<typeof mongoose.connection> => {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected.");
    return mongoose.connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed.");
  }
};

export default db;
