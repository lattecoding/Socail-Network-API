import { Request, Response } from "express";
import User from "../models/User";
import Thought from "../models/Thought";

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("thoughts")
      .populate("friends");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Clean up related thoughts
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Add a friend
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error adding friend", error });
  }
};

// Remove a friend
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.friends = user.friends.filter(
      (friendId) => friendId.toString() !== req.params.friendId,
    );
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error removing friend", error });
  }
};
