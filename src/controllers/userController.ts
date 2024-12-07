import { Request, Response } from "express";
import User from "../models/User.js";
import Thought from "../models/Thought.js";

// GET all users
export const getAllUsers = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    return res.json(users); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// GET a single user by ID
export const getSingleUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("thoughts")
      .populate("friends");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// POST a new user
export const createUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await User.create(req.body);
    return res.json(user); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// PUT to update a user by ID
export const updateUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// DELETE to remove a user by ID (and associated thoughts)
export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove associated thoughts
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    return res.json({ message: "User and associated thoughts deleted" }); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// POST to add a friend
export const addFriend = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// DELETE to remove a friend
export const removeFriend = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};
