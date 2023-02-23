const db = require('../db/connection.js');

module.exports = {

  selectArticleCommentsByArticleId(article_id, {limit = 10, p = 1}) {
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    `, [article_id])
      .then(({ rows }) => {
        const total_count = rows.length;
        const comments = rows.slice((p - 1) * limit, p * limit)

        return {comments, total_count};
      });
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
  },

  selectCommentById(comment_id) {

    return db.query(`
    SELECT * FROM comments
    WHERE comment_id = $1
    `, [comment_id])
      .then(({ rows }) => {
        if (rows.length) {
          return rows[0];
        } else {
          return Promise.reject({status: 404, msg: `Comment with comment_id ${comment_id} does not exist`})
        }
      })
  },

  updateCommentVotes(comment_id, inc_votes) {

    if (inc_votes !== undefined && typeof inc_votes != 'number') {
      return Promise.reject({status: 400, msg: 'inc_votes must be of type number'})
    }

    return db.query(`
    UPDATE comments
    SET votes = votes + $2
    WHERE comment_id = $1
    RETURNING *
    `, [comment_id, inc_votes])
      .then(({ rows }) => rows[0])
  }

}