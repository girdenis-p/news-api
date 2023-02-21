const db = require('../db/connection.js')

module.exports = {
  
  selectTopics: function() {
    return db.query('SELECT * FROM topics;')
      .then(({ rows }) => rows);
  },
  
  selectTopicBySlug(slug) {
    return db.query(`
    SELECT * FROM topics
    WHERE slug = $1
    `, [slug])
      .then(({ rows }) => {
        if (rows.length) {
          return rows[0];
        } else {
          return Promise.reject({status: 404, msg: `Topic with slug "${slug}" does not exist`});
        }
      });
  }
}