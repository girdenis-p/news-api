const { readEndpoints } = require("../models/endpoints.models")

module.exports = {

  getEndpoints: function(req, res, next) {
    readEndpoints()
      .then((endpoints) => {
        res.status(200).send({ api : endpoints });
      })
      .catch(next)
  }

}