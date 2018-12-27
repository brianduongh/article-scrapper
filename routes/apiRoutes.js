const db = require('../models');

module.exports = function(app) {
  app.get('/articles/:id', (req, res) => {
    db.Article.findOne({ _id: req.params.id })
      .populate('comment')
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get('/scrape', (req, res) => {
    axios.get('http://shoryuken.com/').then(response => {
      const $ = cheerio.load(response.data);
      // For each article
      $('article').each((i, element) => {
        const result = {};

        // Save as property of result object
        result.title = $(element)
          .children('.blog-post-main')
          .children('.blog-post-title')
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

  // Get all routes based off of id given by mongodb to find specific article
  app.get('/articles/:id', (req, res) => {
    db.Article.findOne({ _id: req.params.id })
    .populate('comment')
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
  });

  // Route for saving/updating comment
  app.post('/articles/:id', (req, res) => {
    db.Comment.create(req.body)
      .then(function(dbComment) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  })
}
