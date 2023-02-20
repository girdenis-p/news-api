const { selectArticles } = require("../models/articles.model");
const { selectArticleCommentsByArticleId } = require("../models/articles.models");

module.exports = {

  getArticles: function(req, res, next) {
    selectArticles()
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  },

  getArticleCommentsByArticleId: function(req, res, next) {
    const { article_id } = req.params;

    selectArticleCommentsByArticleId(article_id)
      .then((comments) => {
        res.status(200).send({ comments });
      })
      .catch(next);
  }
}