// Example data
export const users = [
  {
    username: "lernantino",
    email: "lernantino@gmail.com",
  },
  {
    username: "john_doe",
    email: "john@example.com",
  },
];

export const thoughts = [
  {
    thoughtText: "Here's a cool thought...",
    username: "lernantino",
    userId: "userId1", // Use real ObjectId later
  },
  {
    thoughtText: "I think this social network API is great!",
    username: "john_doe",
    userId: "userId2",
  },
];

export const reactions = [
  {
    reactionBody: "That's amazing!",
    username: "john_doe",
    createdAt: new Date(),
  },
  {
    reactionBody: "Totally agree!",
    username: "lernantino",
    createdAt: new Date(),
  },
];
