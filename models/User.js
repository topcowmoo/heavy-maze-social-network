// Importing required modules from Mongoose
const { Schema, model } = require('mongoose');

// Defining the User schema
const UserSchema = new Schema(
  {
    // Username of the user
    username: {
      type: String,
      unique: true, // Username must be unique
      trim: true, // Remove whitespace from both ends of the string
      required: 'Username is Required', // Error message if username is not provided
    },
    // Email of the user
    email: {
      type: String,
      unique: true, // Email must be unique
      required: 'Email is Required', // Error message if email is not provided
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/], // Validate email format using regex
    },
    // Array of thoughts associated with the user
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought', // Reference to the Thought model
      },
    ],
    // Array of friends associated with the user
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (self-reference)
      },
    ],
  },
  {
    // Configuration for JSON output
    toJSON: {
      virtuals: true, // Include virtual properties in JSON output
    },
    // Disable automatic generation of IDs
    id: false,
  },
);

// Virtual property to calculate the number of friends for a user
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length; // Returns the length of the friends array
});

// Creating the User model from the UserSchema
const User = model('User', UserSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;