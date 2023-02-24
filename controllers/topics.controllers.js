const { selectTopics, insertTopic } = require("../models/topics.models")

module.exports = {

  getTopics: function(req, res, next) {
    selectTopics()
      .then(topics => {
        res.status(200).send({ topics });
      })
      .catch(next);
  },

  postTopic: function(req, res, next) {
    req.bodyTemplate = ['slug']

    const { slug, description } = req.body;

    insertTopic({ slug, description})
      .then((topic) => {
        res.status(201).send({ topic })
      })
      .catch(next)
  }
}