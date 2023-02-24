const articleRouter = require('express').Router();

const { getArticleById, getArticles, patchArticleById, postArticle, deleteArticleById } = require('../controllers/articles.controllers');
const { postCommentByArticleId, getArticleCommentsByArticleId} = require('../controllers/comments.controllers');

articleRouter.route('/')
  .get(getArticles)
  .post(postArticle)

articleRouter.route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleById)

articleRouter.route('/:article_id/comments')
  .get(getArticleCommentsByArticleId)
  .post(postCommentByArticleId)

module.exports = articleRouter;