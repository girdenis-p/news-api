const { selectUsers, selectUserByUsername } = require("../models/users.models")

module.exports = {
  getUsers: function(req, res, next) {
    selectUsers()
      .then((users) => {
        res.status(200).send({ users })
      })
      .catch(next);
  },

  getUserByUsername: function(req, res, next) {
    const { username } = req.params

    selectUserByUsername(username)
      .then((user) => {
        res.status(200).send({ user })
      })
      .catch(next)
  }
}