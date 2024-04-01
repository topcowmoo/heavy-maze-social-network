// Import mongoose modules
const { connect, connection } = require('mongoose');

// Connection string to MongoDB
const connectionString = 'mongodb://127.0.0.1:27017/socialDB';

// Make connection to MongoDB via connection string
connect(connectionString);

// Export the connection
module.exports = connection;
