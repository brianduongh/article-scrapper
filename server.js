// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

// Require all models
const db = require('./models')

// Initialize express
const PORT = process.env.PORT || 3000;
const app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static('public'));

// Connect to the Mongo DB
mongoose.connect('mongodb://localhost/fightdb', { useNewUrlParser: true });

app.get('/scrape', (req, res) => {
  axios.get('http://shoryuken.com/').then(response => {
    const $ = cheerio.load(response.data);
    // For each article
    $('article').each((i, element) => {
      const result = {};

      // Save as property of result object
      result.title = $(element)
        .children('.blog-post-main')
        .find('a')
        .text();
      result.link = $(element)
        .children('.blog-post-main')
        .find('a')
        .attr('href');
      result.img = $(element)
        .children('.blog-post-thumb')
        .find('img')
        .attr('src');
      result.excerpt = $(element)
        .children('.blog-post-main')
        .find('p')
        .text();

      // Send result as an object to mongodb
      db.Article.create(result)
        .then(dbArticle => {
          console.log(dbArticle);
        })
        .catch(err => {
          console.log(err);
        });
    });

    res.send('Scrape of shoryuken.com is complete');
  });
});

// Get all articles from mongodb
app.get('/articles', (req, res) => {
  db.Article.find({})
  .then(dbArticle => {
    res.json(dbArticle);
  })
  .catch(err => {
    res.json(err);
  });
});


// Start server
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
