const { checkSlugExistsOrUndefined } = require("../models/topics.models");
const { selectArticleById, selectArticles, updateArticleVotes, insertArticle, removeArticleById } = require("../models/articles.models");
const { checkLimitAndPValid } = require("../utils/pagination");
const { removeCommentsByArticleId } = require("../models/comments.models");
const { selectUserByUsername } = require("../models/users.models");


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
    req.bodyTemplate = ['inc_votes']

    const { article_id } = req.params;
    const { inc_votes } = req.body

    selectArticleById(article_id)
      .then(() => {
        return updateArticleVotes(article_id, inc_votes)
      })
      .then((article) => {
        res.status(200).send({ article })
      })
      .catch(next);
  },

  deleteArticleById: function(req, res, next) {
    const { article_id } = req.params;

    selectArticleById(article_id)
      .then(() => {
        return removeCommentsByArticleId(article_id)
      })
      .then(() => {
        return removeArticleById(article_id)
      })
      .then(() => {
        res.sendStatus(204)
      })
      .catch(next)
  },

  postArticle: function(req, res, next) {
    req.bodyTemplate = ['author', 'title', 'body', 'topic']

    const { author, title, body, topic, article_img_url} = req.body

    checkSlugExistsOrUndefined(topic)
      .then(() => {
        return insertArticle({author, title, body, topic, article_img_url})
      })
      .then((article) => {
        res.status(201).send({ article })
      })
      .catch(next)
  },

  getArticles: function(req, res, next) {
    const { topic , sort_by, order, author, limit, p } = req.query;

    //Check whether limit or p is incorrect before querying anything
    checkLimitAndPValid(limit, p)
      .then(() => {
        return checkSlugExistsOrUndefined(topic)
      })
      .then(() => {
        if (author) {
          return selectUserByUsername(author)
        }
      })
      .then(() => {
        return selectArticles({ topic, sort_by, order, author, limit, p})
      })
      .then(({articles, total_count}) => {
        res.status(200).send({ articles, total_count });
      })
      .catch(next);
  },

  
}