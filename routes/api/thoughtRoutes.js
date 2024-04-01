// Import express router module
const router = require('express').Router();

// Import controller methods for the thoughtController file
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// Route for handling requests to '/api/thoughts'
router
  .route('/')
  // GET request handler for retrieving all thoughts
  .get(getAllThought)
  // POST request handler for creating a new thought
  .post(createThought);

// Route for handling requests to '/api/thoughts/:id'
router
  .route('/:id')
  // GET request handler for retrieving a single thought by its ID
  .get(getThoughtById)
  // PUT request handler for updating a thought by its ID
  .put(updateThought)
  // DELETE request handler for deleting a thought by its ID
  .delete(deleteThought);

// Route for handling requests to '/api/thoughts/:thoughtId/reactions'
router.route('/:thoughtId/reactions')
  // POST request handler for adding a reaction to a thought
  .post(addReaction);

// Route for handling requests to '/api/thoughts/:thoughtId/reactions/:reactionId'
router.route('/:thoughtId/reactions/:reactionId')
  // DELETE request handler for removing a reaction from a thought
  .delete(removeReaction);

// Exporting the router to be used in other parts of the application
module.exports = router;
