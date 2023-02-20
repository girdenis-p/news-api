const db = require('../db/connection.js');

module.exports = {

  selectArticleCommentsByArticleId: function(article_id) {
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    `, [article_id])
      .then(({ rows }) => rows);
  }
}