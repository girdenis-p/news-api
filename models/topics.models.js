const db = require('../db/connection.js')

module.exports = {
  
  selectTopics: function() {
    return db.query('SELECT * FROM topics;')
      .then(({ rows }) => rows);
  }
}