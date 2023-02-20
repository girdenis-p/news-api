const db = require('../db/connection.js');

module.exports = {

  selectArticles: function() {
    return db.query('SELECT *, 1 AS comment_count FROM articles;')
      .then(({ rows }) => rows);
  }
}