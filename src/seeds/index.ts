import mongoose from "mongoose";
import cleanDB from "./cleanDB.js";
import { users, thoughts, reactions } from "./data.js";
import User from "../models/User.js";
import Thought from "../models/Thought.js";

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialnetwork";

const seedData = async (): Promise<void> => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGO_URI);

    console.log("Database connected.");

    console.log("Cleaning database...");
    await cleanDB();
    console.log("Database cleaned.");

    // Seed Users
    console.log("Seeding users...");
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users seeded.`);

    // Map thoughts to their respective userId
    const thoughtsWithUserIds = thoughts.map((thought) => {
      const user = createdUsers.find(
        (user) => user.username === thought.username,
      );
      if (!user) {
        throw new Error(`User not found for thought: ${thought.thoughtText}`);
      }
      return {
        ...thought,
        userId: user._id,
      };
    });

    // Seed Thoughts
    console.log("Seeding thoughts...");
    const createdThoughts = await Thought.insertMany(thoughtsWithUserIds);
    console.log(`${createdThoughts.length} thoughts seeded.`);

    // Associate thoughts with users
    console.log("Linking thoughts to users...");
    for (const thought of createdThoughts) {
      await User.findByIdAndUpdate(
        thought.userId,
        { $push: { thoughts: thought._id } },
        { new: true },
      );
    }
    console.log("Thoughts linked to users.");

    // Add reactions to the first thought as an example
    console.log("Seeding reactions...");
    if (createdThoughts.length > 0) {
      await Thought.findByIdAndUpdate(
        createdThoughts[0]._id,
        { $push: { reactions } },
        { new: true },
      );
      console.log("Reactions seeded to the first thought.");
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

// Run the seed function
seedData();
