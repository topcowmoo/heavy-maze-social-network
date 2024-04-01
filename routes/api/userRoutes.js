// Importing express router module
const router = require('express').Router();

// Import controller methods for the userController file
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// Route for handling requests to '/api/users'
router.route('/')
  // GET request handler for retrieving all users
  .get(getAllUser)
  // POST request handler for creating a new user
  .post(createUser);

// Route for handling requests to '/api/users/:id'
router.route('/:id')
  // GET request handler for retrieving a single user by their ID
  .get(getUserById)
  // PUT request handler for updating a user by their ID
  .put(updateUser)
  // DELETE request handler for deleting a user by their ID
  .delete(deleteUser);

// Route for handling requests to '/api/users/:userId/friends/:friendId'
router.route('/:userId/friends/:friendId')
  // POST request handler for adding a friend to a user
  .post(addFriend)
  // DELETE request handler for removing a friend from a user
  .delete(removeFriend);

// Exporting the router to be used in other parts of the application
module.exports = router;