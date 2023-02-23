const db = require('../db/connection.js')

module.exports = {
  
  selectTopics() {
    return db.query('SELECT * FROM topics;')
      .then(({ rows }) => rows);
  },
  
  checkSlugExistsOrUndefined(slug) {
    if (slug === undefined) {
      return Promise.resolve();
    }

    return db.query(`
    SELECT * FROM topics
    WHERE slug = $1
    `, [slug])
      .then(({ rows }) => {
        if (rows.length) {
          return Promise.resolve();
        } else {
          return Promise.reject({status: 404, msg: `Topic with slug "${slug}" does not exist`});
        }
      });
  }
}