import { Router } from "express";
import {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from "../../controllers/userController";

const router = Router();

// /api/users
router
  .route("/")
  .get(getAllUsers) // GET all users
  .post(createUser); // POST a new user

// /api/users/:userId
router
  .route("/:userId")
  .get(getSingleUser) // GET a single user by ID, including populated thoughts and friends
  .put(updateUser) // PUT to update a user by ID
  .delete(deleteUser); // DELETE to remove a user by ID (and their associated thoughts)

// /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addFriend) // POST to add a friend to a user's friend list
  .delete(removeFriend); // DELETE to remove a friend from a user's friend list

export default router;
