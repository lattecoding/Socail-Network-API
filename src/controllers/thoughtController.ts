import { Request, Response } from "express";
import Thought from "../models/Thought.js";
import User from "../models/User.js";

// GET all thoughts
export const getAllThoughts = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const thoughts = await Thought.find().populate("reactions");
    return res.json(thoughts); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// GET a single thought by ID
export const getSingleThought = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate(
      "reactions",
    );

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    return res.json(thought); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// POST a new thought
export const createThought = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { thoughtText, username, userId } = req.body;
    const thought = await Thought.create({ thoughtText, username, userId });

    // After creating the thought, push its _id to the user's thoughts array
    await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });

    return res.json(thought); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// PUT to update a thought by ID
export const updateThought = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    return res.json(thought); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// DELETE to remove a thought by ID
export const deleteThought = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    // Remove the thought's ID from the user's thoughts array
    await User.updateOne(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
    );

    return res.json({ message: "Thought deleted" }); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// POST to add a reaction to a thought
export const addReaction = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true },
    );

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    return res.json(thought); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};

// DELETE to remove a reaction from a thought
export const removeReaction = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true },
    );

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    return res.json(thought); // Return the response explicitly
  } catch (err) {
    return res.status(500).json(err); // Return the response explicitly
  }
};
