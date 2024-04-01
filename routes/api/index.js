// Importing express module, user routes and thought routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Middleware to handle requests starting with '/users' and '/thoughts'
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Exporting the router to be used in other parts of the application
module.exports = router;