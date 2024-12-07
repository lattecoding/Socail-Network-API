import { Schema, model } from "mongoose";
import reactionSchema from "../schemas/Reaction.js";

// Define Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp.toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Use Reaction schema here
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

// Create a virtual called `reactionCount`
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Export Thought model
const Thought = model("Thought", thoughtSchema);
export default Thought;
