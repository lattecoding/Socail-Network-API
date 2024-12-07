import { Request, Response } from "express";
import Thought from "../models/Thought";
import User from "../models/User";

// Get all thoughts
export const getAllThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching thoughts", error });
  }
};

// Get a single thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error fetching thought", error });
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);

    // Add thought to the user's list
    const user = await User.findById(req.body.userId);
    if (user) {
      user.thoughts.push(newThought._id);
      await user.save();
    }

    res.status(201).json(newThought);
  } catch (error) {
    res.status(500).json({ message: "Error creating thought", error });
  }
};

// Update a thought
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.status(200).json(updatedThought);
  } catch (error) {
    res.status(500).json({ message: "Error updating thought", error });
  }
};

// Delete a thought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    // Remove thought from the associated user's list
    await User.updateMany(
      { thoughts: req.params.id },
      { $pull: { thoughts: req.params.id } },
    );

    res.status(200).json({ message: "Thought deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting thought", error });
  }
};

// Add a reaction
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    thought.reactions.push(req.body);
    await thought.save();

    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error adding reaction", error });
  }
};

// Remove a reaction
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    thought.reactions = thought.reactions.filter(
      (reaction) => reaction._id.toString() !== req.params.reactionId,
    );
    await thought.save();

    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error removing reaction", error });
  }
};
