module.exports = {

  handlePSQLErrors: function(err, req, res, next) {
    if (err.code === '22P02') {
      next({status: 400, msg: 'Bad request, expected numeric id'})
    } else {
      next(err);
    }
  },

  handle400StatusCodes: function(err, req, res, next) {
    if (err.status === 400) {
      res.status(400).send({ msg: err.msg })
    } else if (err.status === 404) {
      res.status(404).send({msg: `Endpoint ${req.url} not found!`})
    } else {
      next(err);
    }
  },

  handle500StatusCodes: function(err, req, res, next) {
    console.log(err);

    res.sendStatus(500);
  }
}