const articleRouter = require('express').Router();

const { getArticleById, getArticles, patchArticleById } = require('../controllers/articles.controllers');
const { postCommentByArticleId, getArticleCommentsByArticleId} = require('../controllers/comments.controllers');

articleRouter.get('/', getArticles);

articleRouter.get('/:article_id', getArticleById)

articleRouter.patch('/:article_id', patchArticleById)

articleRouter.post('/:article_id/comments', postCommentByArticleId)

articleRouter.get('/:article_id/comments', getArticleCommentsByArticleId)

module.exports = articleRouter;