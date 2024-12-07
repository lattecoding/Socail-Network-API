import { Schema, model, Types } from "mongoose";

// Define User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match a valid email address"],
    },
    thoughts: [
      {
        type: Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

// Create a virtual called `friendCount`
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Export User model
const User = model("User", userSchema);
export default User;
