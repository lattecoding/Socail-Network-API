import mongoose from "mongoose";
import cleanDB from "./cleanDB.js";
import { users, thoughts, reactions } from "./data.js";
import User from "../models/User.js";
import Thought from "../models/Thought.js";

const seedData = async (): Promise<void> => {
  try {
    // Clean the database first
    await cleanDB();

    // Seed Users
    const createdUsers = await User.insertMany(users);

    // Seed Thoughts (associate with the created users)
    const createdThoughts = await Thought.insertMany(
      thoughts.map((thought) => ({
        ...thought,
        userId: createdUsers.find((user) => user.username === thought.username)
          ?._id,
      })),
    );

    console.log(`${createdUsers.length} users seeded.`);
    console.log(`${createdThoughts.length} thoughts seeded.`);

    // You can add reactions here by updating the thoughts with the reactions array, for example:
    // You might want to create reactions based on the created thought IDs.
    await Thought.updateOne(
      { _id: createdThoughts[0]._id },
      { $push: { reactions: reactions } },
    );

    console.log("Reactions seeded.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
