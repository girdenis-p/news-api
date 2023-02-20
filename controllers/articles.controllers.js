const { selectArticleById } = require("../models/articles.models")

module.exports = {

  getArticleById: function(req, res, next) {
    const { article_id } = req.params;

    selectArticleById(article_id)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch(next);
  }
}