const { selectArticleById } = require("../models/articles.models");
const { insertCommentByArticleId, selectArticleCommentsByArticleId } = require("../models/comments.models")

module.exports = {

  postCommentByArticleId: function(req, res, next) {
    req.body.template = ['username', 'body']
    
    const { article_id } = req.params;

    selectArticleById(article_id)
      .then(() => {
        return insertCommentByArticleId(article_id, req.body)
      })
      .then((comment) => {
        res.status(201).send({ comment })
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