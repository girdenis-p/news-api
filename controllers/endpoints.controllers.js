const endpoints = require('../endpoints.json');

module.exports = {

  getEndpoints: function(req, res, next) {
    res.status(200).send({ api: endpoints })
  }

}