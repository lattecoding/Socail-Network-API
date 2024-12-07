import { Router } from "express";
import {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from "../../controllers/thoughtController.js";

const router = Router();

// /api/thoughts
router
  .route("/")
  .get(getAllThoughts) // GET all thoughts
  .post(createThought); // POST a new thought (and associate with user)

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought) // GET a single thought by ID
  .put(updateThought) // PUT to update a thought by ID
  .delete(deleteThought); // DELETE to remove a thought by ID

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction); // POST to add a reaction to a thought

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction); // DELETE to remove a reaction by its ID

export default router;
