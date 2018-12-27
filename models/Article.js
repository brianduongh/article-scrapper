const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  excerpt: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  // Associate article with comment
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
