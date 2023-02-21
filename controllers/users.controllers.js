const { selectUsers } = require("../models/users.models")

module.exports = {
  getUsers: function(req, res, next) {
    selectUsers()
      .then((users) => {
        res.status(200).send({ users })
      })
      .catch(next);
  }
}