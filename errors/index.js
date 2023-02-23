module.exports = {

  handlePSQLErrors: function(err, req, res, next) {
    if (err.code === '22P02') {
      next({status: 400, msg: 'Bad request, expected numeric id'})
    } else if (err.code === '23502') {
      //23502 is caused due to a not null violation, this indicates that something is missing from the req.body
      const bodyProperties = Object.keys(req.body);

      //Templates are created when the controller for a given method and path is invoked
      const missingProperty = req.bodyTemplate.find(property => {
        return !bodyProperties.includes(property)
      });

      next({status: 400, msg: `Body must contain "${missingProperty}" property`})
    } else if (err.code === '23503') {
      //Note this err.code is due a foreign key violation which currently is only caused by a non-existing user posting a comment
      if (req.body.author) {
        next({status: 404, msg: `User with username "${req.body.author}" does not exist`})
      } else {
        next({status: 404, msg: `Unable to post as "${req.body.username}" as user does not exist`})
      }
    } else {
      next(err);
    }
  },

  handleCustomErrors: function(err, req, res, next) {
    if (err.status) {
      //Default message handling
      if (!err.msg) {
        err.msg = {
          404: `Endpoint ${req.url} not found!`
        }[err.status];
      }

      res.status(err.status).send({ msg : err.msg });
    } else {
      next(err);
    }
  },

  handle500StatusCodes: function(err, req, res, next) {
    console.log(err);

    res.sendStatus(500);
  }
}