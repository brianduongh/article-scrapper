// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars')

// Initialize express
const PORT = process.env.PORT || 3000;
const app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static('public'));

// Add handlebars engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/fightdb';
mongoose.connect(MONGODB_URI);

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start server
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
