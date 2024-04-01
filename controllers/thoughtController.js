// Importing the Thought and User models from the '../models' file
const { Thought, User } = require('../models');

// Object containing methods for handling thought-related operations
const thoughtController = {
  // Get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => {
        res.status(200).json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  // Get one thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Create a thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true },
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: 'Thought created but no user with this id!' });
        }

        res.status(200).json({ message: 'Thought successfully created!' });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a thought by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.status(200).json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }

        // Remove thought ID from user's `thoughts` field
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true },
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: 'Thought created but no user with this id!' });
        }
        res.status(200).json({ message: 'Thought successfully deleted!' });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true },
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.status(200).json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a reaction from a thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true },
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: 'No thought found with this id' });
        }
        return res
          .status(200)
          .json({ message: 'Reaction successfully deleted', dbThoughtData });
      })
      .catch((err) => res.status(400).json(err));
  },
};

// Exporting the thoughtController object for use in other parts of the application
module.exports = thoughtController;
