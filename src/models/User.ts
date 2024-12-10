import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }], // Add friends relationship
});

export default mongoose.model("User", userSchema);
