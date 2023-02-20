const { selectArticleById, selectArticles } = require("../models/articles.models")

module.exports = {

  getArticleById: function(req, res, next) {
    const { article_id } = req.params;

    selectArticleById(article_id)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch(next);
  },

  getArticles: function(req, res, next) {
    selectArticles()
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  }
}