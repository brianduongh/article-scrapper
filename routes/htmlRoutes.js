const db = require("../models");

module.exports = function(app) {
  app.get('/', (req, res) => {
    db.Article.find({})
    .populate('comment')
    .then(dbArticle => {
      const hbsObject = { articles: dbArticle };
      res.render('index', hbsObject);
    })
    .catch(err => {
      res.json(err);
    });
  });
}
