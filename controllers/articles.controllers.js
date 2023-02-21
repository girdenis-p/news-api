const { selectArticleById, selectArticles, selectArticleCommentsByArticleId, updateArticleVotes } = require("../models/articles.models")

module.exports = {

  getArticleById: function(req, res, next) {
    const { article_id } = req.params;

    selectArticleById(article_id)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch(next);
  },

  patchArticleById: function(req, res, next) {
    const { article_id } = req.params;
    const { inc_votes } = req.body

    updateArticleVotes(article_id, inc_votes)
      .then((article) => {
        res.status(202).send({ article })
      })
  },

  getArticles: function(req, res, next) {
    selectArticles()
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  },

  getArticleCommentsByArticleId: function(req, res, next) {
    const { article_id } = req.params;

    //Check article exists before selecting comments
    selectArticleById(article_id)
      .then(() => {
        return selectArticleCommentsByArticleId(article_id)
      })
      .then((comments) => {
        res.status(200).send({ comments });
      })
      .catch(next);
  }
}