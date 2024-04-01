// Importing the User and Thought models from the '../models' file
const { User, Thought } = require('../models');

// Object containing methods for handling user-related operations
const userController = {
  // Get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbUserData) => {
        res.status(200).json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  // Get a single user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: 'No user found with this id!' });
        }
        res.status(200).json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  // Create a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => {
        res.status(201).json(dbUserData);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  // Update user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: 'No user found with this id!' });
        }
        res.status(200).json(dbUserData);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  // Delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        // Get ID of user's `thoughts` and delete them all
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res
          .status(200)
          .json({ message: 'User and associated thoughts deleted!' });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  // Add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true },
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id' });
        }
        res.status(200).json(dbUserData);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  // Delete friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true },
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.status(200).json(dbUserData);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
};

// Exporting the userController object for use in other parts of the application
module.exports = userController;
