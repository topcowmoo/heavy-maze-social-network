// Importing express and API routes
const router = require('express').Router();
const apiRoutes = require('./api');

// Middleware to handle requests with '/api'
router.use('/api', apiRoutes);

// Middleware to handle requests with '/'
router.use((req, res) => {
  // Send 404 status code and message if route is not found
  res.send(404).send('Wrong Route!');
});

// Exporting router to be used in other parts of application
module.exports = router;