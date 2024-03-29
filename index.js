const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const express = require('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

// npm run dev

// env file 

change the PORT if no env needed