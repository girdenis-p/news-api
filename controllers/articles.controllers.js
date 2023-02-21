const { selectArticleById, selectArticles, } = require("../models/articles.models");
const { selectTopicBySlug } = require("../models/topics.models");

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

    //This promise will only resolve if either there is no queried topic or the queried topic exists
    new Promise((resolve, reject) => {
      const { topic: slug } = req.query

      if (slug === undefined) {
        resolve();
      } else {
        selectTopicBySlug(slug)
          .then(resolve, reject);
      }
    })
      .then(() => {
        return selectArticles(req.query)
      })
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  },

  
}