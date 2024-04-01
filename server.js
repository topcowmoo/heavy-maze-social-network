// Importing modules
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Setting up the express app and port number
const app = express();
const PORT = process.env.PORT || 3001;

// Defining middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Connect to MongoDB first, then start the express server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});