const db = require('../db/connection.js')

module.exports = {
  selectUsers: function() {
    return db.query(`
    SELECT * FROM users;
    `)
      .then(({ rows }) => rows);
  }
}