const { selectTopicBySlug, checkSlugExistsOrUndefined } = require("../models/topics.models");
const { selectArticleById, selectArticles, updateArticleVotes } = require("../models/articles.models")


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

  getArticles: function(req, res, next) {
    const { topic , sort_by, order} = req.query;

    checkSlugExistsOrUndefined(topic)
      .then(() => {
        return selectArticles({ topic, sort_by, order})
      })
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  },

  
}