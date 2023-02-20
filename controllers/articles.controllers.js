const { selectArticles } = require("../models/articles.model")

module.exports = {

  getArticles: function(req, res, next) {
    selectArticles()
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch(next);
  }
}