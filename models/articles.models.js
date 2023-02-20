const db = require('../db/connection.js');

module.exports = {

  selectArticleById: function(article_id) {
    return db.query(`
    SELECT * FROM articles
    WHERE article_id =  $1
    `, [article_id])
      .then(({ rows }) => {
        if (rows.length) {
          return rows[0];
        } else {
          return Promise.reject({status: 404});
        }
      })
  }
}