const { insertCommentByArticleId } = require("../models/comments.models")

module.exports = {

  postCommentByArticleId: function(req, res, next) {
    const { article_id } = req.params;

    insertCommentByArticleId(article_id, req.body)
      .then((comment) => {
        res.status(201).send({ comment })
      })
      .catch(next);
  }
}