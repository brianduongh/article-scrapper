// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
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
mongoose.connect('mongodb://localhost/fightdb', { useNewUrlParser: true });

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start server
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
