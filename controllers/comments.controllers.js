const { selectArticleById } = require("../models/articles.models");
const { insertCommentByArticleId, selectArticleCommentsByArticleId, removeCommentById, selectCommentById, updateCommentVotes } = require("../models/comments.models")

module.exports = {

  postCommentByArticleId: function(req, res, next) {
    req.bodyTemplate = ['username', 'body']
    
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
  },

  deleteCommentById: function(req, res, next) {
    const { comment_id } = req.params;

    selectCommentById(comment_id)
      .then(() => {
        return removeCommentById(comment_id)
      })
      .then(() => {
        res.sendStatus(204);
      })
      .catch(next);
  },

  patchCommentById: function(req, res, next) {
    req.bodyTemplate = ['inc_votes']

    const { comment_id } = req.params;
    const { inc_votes } = req.body;

    selectCommentById(comment_id)
      .then(() => {
        return updateCommentVotes(comment_id, inc_votes)
      })
      .then((comment) => {
        res.status(200).send({ comment })
      })
      .catch(next)
  }
}