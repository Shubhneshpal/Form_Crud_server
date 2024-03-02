const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const formRoutes = require('./routes/routes.js');
const path = require('path');

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Connect to the database
const Connection = require('./database/db.js');
Connection();

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use form submission routes
app.use('/api/forms', formRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
