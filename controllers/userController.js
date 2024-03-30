const { User, Thought } = require('../models');

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
        res.status(200).json(dbUserData); // Send status and response together
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err); // Send error status and message
      });
  },

  // get a single user by id
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
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.status(200).json(dbUserData); // Send status and response together
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err); // Send error status and message
      });
  },

  // create a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => {
        res.status(201).json(dbUserData); // Use 201 for successful creation
      })
      .catch((err) => {
        res.status(400).send(err); // Send error status and message
      });
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.status(200).json(dbUserData); // Send status and response together
      })
      .catch((err) => {
        res.status(400).send(err); // Send error status and message
      });
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        // Get ids of user's `thoughts` and delete them all
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.status(200).json({ message: 'User and associated thoughts deleted!' });
      })
      .catch((err) => {
        res.status(400).send(err); // Send error status and message
      });
  },

  // add friend
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
        res.status(200).json(dbUserData); // Send status and response together
      })
      .catch((err) => {
        res.status(400).send(err); // Send error status and message
      });
  },

  // delete friend
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
        res.status(200).json(dbUserData); // Send status and response together
      })
      .catch((err) => {
        res.status(400).send(err); // Send error status and message
      });
  },
};

module.exports = userController;
