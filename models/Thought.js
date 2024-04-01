// Importing required modules from Mongoose
const { Schema, model, Types } = require('mongoose');

// Defining the Reaction schema
const ReactionSchema = new Schema(
  {
    // Unique identifier for the reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Default value is a new ObjectId
    },
    // Body of the reaction
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // Username of the user who reacted
    username: {
      type: String,
      required: true,
    },
    // Date and time when the reaction was created
    createdAt: {
      type: Date,
      default: Date.now,
      // Getter function to format date
      get: function (value) {
        return value.toLocaleDateString();
      },
    },
  },
  {
    // Configuration for JSON output
    toJSON: {
      virtuals: true, // Include virtual properties in JSON output
      getters: true, // Apply getters to JSON output
    },
    // Disable automatic generation of IDs
    id: false,
  },
);

// Defining the Thought schema
const ThoughtSchema = new Schema(
  {
    // Text of the thought
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // Date and time when the thought was created
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Username of the user who created the thought
    username: {
      type: String,
      required: true,
    },
    // Array of reactions associated with the thought
    reactions: [ReactionSchema], // Embed ReactionSchema as a subdocument
  },
  {
    // Configuration for JSON output
    toJSON: {
      virtuals: true, // Include virtual properties in JSON output
      getters: true, // Apply getters to JSON output
    },
    // Disable automatic generation of IDs
    id: false,
  },
);

// Getter function to format date for the 'createdAt' field
ThoughtSchema.path('createdAt').get(function (value) {
  return value.toLocaleDateString();
});

// Virtual property to calculate the number of reactions for a thought
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Creating the Thought model from the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// Exporting the Thought model for use in other parts of the application
module.exports = Thought;
