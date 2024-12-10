import mongoose, { Schema } from "mongoose";

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true },
  username: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  reactions: [
    {
      reactionBody: { type: String, required: true },
      username: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Thought", thoughtSchema);
