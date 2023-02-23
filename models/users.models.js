const db = require('../db/connection.js')

module.exports = {
  selectUsers() {
    return db.query(`
    SELECT * FROM users;
    `)
      .then(({ rows }) => rows);
  },

  selectUserByUsername(username) {
    return db.query(`
    SELECT * FROM users
    WHERE username = $1
    `, [username])
      .then(({rows}) => {
        if (rows.length) {
          return rows[0]
        } else {
          return Promise.reject({status: 404, msg: `User with username "${username}" does not exist`})
        }
      })
  }
}