module.exports = {

  handlePSQLErrors: function(err, req, res, next) {
    if (err.code === '22P02') {
      next({status: 400, msg: 'Bad request, expected numeric id'})
    } else if (err.code === '23502') {
      next({status: 400, msg: 'Missing required fields from posted body'})
    } else if (err.code === '23503') {
      //Note this err.code is due a foreign key violation which currently is only caused by a non-existing user posting a comment
      next({status: 401, msg: `Unable to post as "${req.body.username}" as user does not exist`})
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