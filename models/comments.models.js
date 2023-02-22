const db = require('../db/connection.js');

module.exports = {

  selectArticleCommentsByArticleId: function(article_id) {
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    `, [article_id])
      .then(({ rows }) => rows);
  },

  insertCommentByArticleId(article_id, {username, body}) {

    return db.query(`
    INSERT INTO comments
      (article_id, author, body)
    VALUES
      ($1, $2, $3)
    RETURNING *;
    `, [article_id, username, body])
      .then(({ rows }) => rows[0])
  },

  removeCommentById(comment_id) {
    
    return db.query(`
    DELETE FROM comments
    WHERE comment_id = $1
    `, [comment_id]);
  }

}